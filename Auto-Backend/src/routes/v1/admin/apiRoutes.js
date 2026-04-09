import express from "express";
const router = express.Router();
import plan from "./plan/plan.routes.js"
import vehicle_category from "./vehicle_category/vehicle_category.route.js";

router.use("/plan",plan);
router.use("/vehicle-category",vehicle_category);

export default router;