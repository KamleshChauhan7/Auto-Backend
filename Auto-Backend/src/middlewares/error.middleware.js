import logger from "../utils/logger.js";
import { ERROR_CODES } from "../errors/errorCodes.js";

export const errorHandler = (err, req, res, next) => {
  let errorResponse = { ...ERROR_CODES.INTERNAL_ERROR };

  // 1. Identify JSON Syntax Errors (Prevents the HTML error page)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    errorResponse = ERROR_CODES.INVALID_JSON;
  }

  // 2. Identify Custom ApiErrors (manually thrown by you)
  else if (err.code && err.status) {
    errorResponse = {
      status: err.status,
      code: err.code,
      message: err.message
    };
  }

  // 3. Identify Sequelize Database Errors
  else if (err.name?.startsWith('Sequelize')) {
    errorResponse = ERROR_CODES.DB_CONSTRAINT_ERROR;
  }

  // Log the detailed error to your file system (for you to see)
  logger.error({
    message: err.message,
    code: errorResponse.code,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  // 4. Send the Clean JSON Response (for the frontend to see)
  return res.status(errorResponse.status).json({
    success: false,
    error: {
      code: errorResponse.code,
      message: errorResponse.message,
      // Include original message only in development for easier debugging
    //   details: process.env.NODE_ENV === 'development' ? err.message : undefined
    },
  });
};