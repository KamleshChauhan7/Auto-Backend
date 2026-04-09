import express from "express";
import vehicleRoutes from "./vehicle/vehicle.routes.js"; 
import creditRoutes from "./credit/credit.routes.js"; // Import new routes
import admin from "./admin/apiRoutes.js";
import mobile from "./mobile/apiRoutes.js"

const router = express.Router();

// Web Routes
router.use("/vehicle", vehicleRoutes); 
router.use("/credit", creditRoutes);

// web hook

// Admin Routes
router.use("/admin",admin);

// Mobile Routes
router.use("/mobile",mobile);

export default router;




