// src/routes/v1/car/car.routes.js
import { Router } from "express";
import { addCarBrand } from "../../../controllers/v1/vehicle/addVehicleBrand.controller.js";
import { syncGatewayIdentity } from "../../../middlewares/gatewaySync.middleware.js";
import { restrictToGateway } from "../../../middlewares/ipWhitelist.middleware.js"; // New

const router = Router();

/**
 * SECURITY CHAIN:
 * 1. restrictToGateway: Ensures the request is from the Gateway IP.
 * 2. syncGatewayIdentity: Verifies the Secret Key & Syncs DB.
 */
router.post(
  "/add-car-brand", 
  restrictToGateway, 
  syncGatewayIdentity, 
  addCarBrand
);

export default router;