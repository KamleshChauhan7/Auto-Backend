import { Router } from "express";
import { addPlan, getAllPlans } from "../../../../controllers/v1/admin/plan/plan.controller.js";


const router = Router();

router.post(
  "/add-plan",
  addPlan
)

router.get(
  "/getAllPlans",
    getAllPlans
)

export default router;