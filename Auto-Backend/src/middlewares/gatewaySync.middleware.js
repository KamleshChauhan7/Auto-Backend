// src/middlewares/gatewaySync.middleware.js
import { User, Branches } from "../models/index.js";
import { ApiError } from "../errors/ApiError.js";

export const syncGatewayIdentity = async (req, res, next) => {
  try {
    const incomingSecret = req.headers["x-api-secret"];
    const userId = req.headers["x-user-id"];
    const branchId = req.headers["x-branch-id"];
    const productKey = req.headers["x-product-key"];

    console.log("User id=====:", userId);
    console.log("Product key=====:", productKey);
    console.log("Branch Id=====:", branchId);
    console.log("incomingSecret===========:", incomingSecret);

    // 1. Secret Key Verification
    if (incomingSecret !== process.env.AUTO_SECRET) {
      // Using 401 instead of 500 for security errors
      return res.status(401).json({ success: false, message: "Invalid Secret" });
    }

    // 2. Sync User 
    // We must provide 'central_user_id' because it is NOT NULL 
    const [userRecord] = await User.findOrCreate({
      where: { user_id: userId },
      defaults: {
        central_user_id: userId, // Use the incoming ID as the central reference
        Status: 'ACTIVE'
      }
    });

    // 3. Sync Branch 
    // We must provide 'central_branch_id' because it is NOT NULL 
    const [branchRecord] = await Branches.findOrCreate({
      where: { branch_id: branchId },
      defaults: {
        central_branch_id: branchId,
        Status: 'ACTIVE'
      }
    });

    req.user = { user_id: userId };
    req.branch = { branch_id: branchId };

    next();
  } catch (err) {
    // CRITICAL: Log the error to your terminal to see the exact Sequelize validation error
    console.error("DETAILED SYNC ERROR:", err);
    next(err);
  }
};