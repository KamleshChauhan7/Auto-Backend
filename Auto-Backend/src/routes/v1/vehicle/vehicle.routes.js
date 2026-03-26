// src/routes/v1/car/car.routes.js
import { Router } from "express";
import { syncGatewayIdentity } from "../../../middlewares/gatewaySync.middleware.js";
import { addVehicle } from "../../../controllers/v1/vehicle/addVehicle.js"
import { getFullDetails } from "../../../controllers/v1/vehicle/getFullDetails.js";

import { verifyVehicleRC } from "../../../controllers/v1/vehicle/verifyRC.controller.js";
import { getVehicleDetails } from "../../../controllers/v1/vehicle/getVehicleData.js"
const router = Router();


router.post(
  "/add-vehicle",
  syncGatewayIdentity,
  addVehicle
)

router.get(
    "/full-details", 
    getFullDetails
);

router.post("/verify-rc", 
  verifyVehicleRC
);

router.get(
  "/:vehicle_id",
  getVehicleDetails
)




export default router;