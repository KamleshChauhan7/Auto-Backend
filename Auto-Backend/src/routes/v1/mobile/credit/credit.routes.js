import express from "express";
import { syncGatewayIdentity } from "../../../../middlewares/gatewaySync.middleware.js";
import { purchaseCredit,verifyPayment } from "../../../../controllers/v1/credit/credit.controller.js";

const router = express.Router();

router.post("/purchase", syncGatewayIdentity, purchaseCredit);
router.post("/verify", syncGatewayIdentity, verifyPayment);

export default router;