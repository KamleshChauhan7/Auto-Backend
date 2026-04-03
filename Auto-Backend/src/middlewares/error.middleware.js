import logger from "../utils/logger.js";
import { ERROR_CODES } from "../errors/errorCodes.js";

export const errorHandler = (err, req, res, next) => {

  let errorResponse = {
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
    ...ERROR_CODES?.INTERNAL_ERROR
  };

  // Identify JSON Syntax Errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    errorResponse = ERROR_CODES.INVALID_JSON;
  }

  // Identify Custom ApiErrors (Using Optional Chaining to prevent crashes)
  else if (err?.code && err?.status) {
    errorResponse = {
      status: err.status,
      code: err.code,
      message: err.message
    };
  }

  // Identify Sequelize Database Errors
  else if (err?.name?.startsWith('Sequelize')) {
    // Default Database Error
    errorResponse = {
      ...ERROR_CODES.DB_CONSTRAINT_ERROR,
      status: 400
    };

    // Masking sensitive Foreign Key/Constraint details
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      errorResponse.message = "The referenced record (Branch or User) does not exist.";
      errorResponse.code = "REFERENCE_NOT_FOUND";
    }
    else if (err.name === 'SequelizeUniqueConstraintError') {
      // Extract the field name
      const fieldName = err.errors?.[0]?.path || "record";

      errorResponse.message = "The Record you entered is already exist";
      errorResponse.code = "DUPLICATE_ENTRY";
    }

    errorResponse.details = process.env.NODE_ENV === 'development' ? err.parent?.detail || err.message : undefined;
  }

  logger.error({
    message: err?.message || "No error message",
    code: errorResponse.code,
    stack: err?.stack,
    path: req?.originalUrl,
    method: req?.method,
  });

  // Send the Clean JSON Response
  // Added a fallback to 500 just in case errorResponse.status is undefined
  return res.status(errorResponse.status || 500).json({
    success: false,
    error: {
      code: errorResponse.code,
      message: errorResponse.message,
      // Useful for debugging Sequelize or TypeErrors in development
      // details: process.env.NODE_ENV === 'development' ? (err?.message || errorResponse.details) : undefined
    },
  });
};