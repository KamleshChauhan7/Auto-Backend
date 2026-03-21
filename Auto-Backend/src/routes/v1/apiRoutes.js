import express from "express";
import carRoutes from "./car/car.routes.js"; 

const router = express.Router();

// This mounts all car routes under /api/v1/car
router.use("/car", carRoutes); 

export default router;