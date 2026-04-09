import express from "express";
import { syncGatewayIdentity } from "../../../middlewares/gatewaySync.middleware.js";
import { purchaseCredit } from "../../../controllers/v1/credit/credit.controller.js";
import { getOrderStatus } from "../../../controllers/v1/credit/creditStatus.controller.js";

const router = express.Router();

router.post("/purchase", syncGatewayIdentity, purchaseCredit);
router.post("/status", syncGatewayIdentity, getOrderStatus);

export default router;