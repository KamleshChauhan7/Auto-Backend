import express from "express";
import vehicleRoutes from "./vehicle/vehicle.routes.js"; 
import creditRoutes from "./credit/credit.routes.js"; // Import new routes
// import admin from "./admin/plan.routes.js";


const router = express.Router();

router.use("/vehicle", vehicleRoutes); 

router.use("/credit", creditRoutes);

// router.use("/admin",admin);


export default router;




