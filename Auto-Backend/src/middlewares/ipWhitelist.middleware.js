// src/middlewares/ipWhitelist.middleware.js
import { ApiError } from "../errors/ApiError.js";

export const restrictToGateway = (req, res, next) => {
  const clientIp = req.ip || req.connection.remoteAddress;
  const allowedIp = process.env.ALLOWED_GATEWAY_IP;

  // In development, Express often sees '::1' for localhost
  const isLocalhost = clientIp === "127.0.0.1" || clientIp === "::ffff:127.0.0.1" || clientIp === "::1";

  console.log(`Checking Access - Incoming IP: ${clientIp}`);

  // If in production, strictly check against the ALLOWED_GATEWAY_IP
  if (process.env.NODE_ENV === "production") {
    if (clientIp !== allowedIp) {
      console.error(`SECURITY ALERT: Blocked unauthorized IP: ${clientIp}`);
      return res.status(403).json({
        success: false,
        message: "Access Denied: This service only accepts requests from the SeaNeB Gateway."
      });
    }
  } else {
    // In development, we allow localhost for testing
    if (!isLocalhost && clientIp !== allowedIp) {
      return res.status(403).json({ success: false, message: "Unauthorized IP" });
    }
  }

  next();
};