import express from "express";
import vehicleRoutes from "./vehicle/vehicle.routes.js"; 

const router = express.Router();

// This mounts all car routes under /api/v1/car
router.use("/auto", vehicleRoutes); 

export default router;