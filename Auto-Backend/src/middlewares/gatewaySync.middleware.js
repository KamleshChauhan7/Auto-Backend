// src/middlewares/gatewaySync.middleware.js
import { User, Branches } from "../models/index.js";
import { ApiError } from "../errors/ApiError.js";
import seanebDB from "../config/db.js";

export const syncGatewayIdentity = async (req, res, next) => {
  try {
    const incomingSecret = req.headers["x-internal-secret"] || req.headers["x-api-secret"];
    const centralUserId = req.headers["x-user-id"];
    const centralBranchId = req.headers["x-branch-id"];

    // Ensure the headers exist
    if (!centralBranchId || !centralUserId) {
      return res.status(400).json({
        success: false,
        message: "Missing x-branch-id or x-user-id headers"
      });
    }

    if (incomingSecret !== process.env.AUTO_SECRET) {
      return res.status(401).json({ success: false, message: "Invalid Secret" });
    }

    const t = await seanebDB.transaction();

    try {
      // Sync User
      const [userRecord] = await User.findOrCreate({
        where: { central_user_id: centralUserId },
        defaults: { central_user_id: centralUserId },
        transaction: t
      });

      // Sync Branch
      const [branchRecord] = await Branches.findOrCreate({
        where: { central_branch_id: centralBranchId },
        defaults: { central_branch_id: centralBranchId },
        transaction: t
      });

      await t.commit();

      req.user = { user_id: userRecord.user_id };
      req.branch = { branch_id: branchRecord.branch_id };

      next();
    } catch (dbError) {
      await t.rollback();
      throw dbError;
    }
  } catch (err) {
    console.error("DETAILED SYNC ERROR:", err);
    next(err);
  }
};
