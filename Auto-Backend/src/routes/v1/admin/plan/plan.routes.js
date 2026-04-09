import { Router } from "express";
import { addPlan, getAllPlans } from "../../../../controllers/v1/admin/plan/plan.controller.js";
import { updatePlan } from "../../../../controllers/v1/admin/plan/update.plan.controller.js"

const router = Router();

router.post(
  "/add-plan",
  addPlan
);

router.get(
  "/getAllPlans",
  getAllPlans
);

router.put(
  "/update-plan",
  updatePlan
);

export default router;