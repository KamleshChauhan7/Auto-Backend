import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.js"; // Reuse your existing error class
import { ERROR_CODES } from "../errors/errorCodes.js";

export const authenticateUser = async (req, res, next) => {
  try {
    // 1. Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(ERROR_CODES.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify the token using the secret from your .env
    // This MUST match the SECRET_JWT in your Central Server
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    // 3. Check if the token belongs to the correct product (Auto)
    // In your signup/login, you store product_id in the token payload
    if (!decoded.product_id) {
        throw new ApiError(ERROR_CODES.INVALID_PRODUCT);
    }

    // 4. Extract User ID (stored as 'sub' in your Central Server code)
    // Also attach the product_id for extra safety
    req.user = {
      user_id: decoded.sub,
      product_id: decoded.product_id
    };

    next();
  } catch (err) {
    // If token is expired or secret is wrong, jwt.verify throws an error
    if (err.name === "TokenExpiredError") {
      next(new ApiError(ERROR_CODES.SESSION_EXPIRED));
    } else {
      next(new ApiError(ERROR_CODES.UNAUTHORIZED));
    }
  }
};