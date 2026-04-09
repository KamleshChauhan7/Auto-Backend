// src/routes/v1/car/car.routes.js
import { Router } from "express";
import { syncGatewayIdentity } from "../../../../middlewares/gatewaySync.middleware.js";

import { getOwner } from "../../../../controllers/v1/mobile/vehicle/getVehicleByRc.controller.js";
import {verifyOwner} from "../../../../controllers/v1/mobile/vehicle/verifyOwner.controller.js"
const router = Router();


// router.post(
//   "/add-vehicle",
//   syncGatewayIdentity,
//   addVehicle
// )

router.post("/get-owner", 
  //syncGatewayIdentity,
  getOwner
);

router.post("/verify-owner",
  
  verifyOwner
)




export default router;