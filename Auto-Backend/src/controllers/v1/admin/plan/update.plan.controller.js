import { updatePlanService } from "../../../../services/admin/plan/plan.service.js";
import { ApiError } from "../../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../../errors/errorCodes.js";

export const updatePlan = async (req, res, next) => {
    try {
        const { currentPlanName, new_plan_name, price, duration_days } = req.body;

        if (!currentPlanName) {
            throw new ApiError(ERROR_CODES.REQUIRED_FIELDS_MISSING, "currentPlanName is required in the request body.");
        }

        const updatedPlan = await updatePlanService({
            currentPlanName,
            new_plan_name,
            price,
            duration_days
        });

        return res.status(200).json({
            success: true,
            message: "Subscription plan updated successfully.",
            data: updatedPlan
        });

    } catch (error) {
        next(error);
    }
};