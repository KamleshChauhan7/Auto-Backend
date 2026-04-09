import { createPlanService, fetchPlansService } from "../../../../services/admin/plan/plan.service.js";
import { ApiError } from "../../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../../errors/errorCodes.js";


export const addPlan = async (req, res, next) => {
    try {
        const { plan_name, price, duration_days } = req.body;

        if (!plan_name || price === undefined || !duration_days) {
            throw new ApiError(ERROR_CODES.REQUIRED_FIELDS_MISSING);
        }

        const newPlan = await createPlanService({ plan_name, price, duration_days });

        return res.status(201).json({
            success: true,
            message: "Subscription plan created successfully",
            data: newPlan
        });

    } catch (error) {
        next(error);
    }
};

export const getAllPlans = async (req, res, next) => {
    try {

        const plans = await fetchPlansService();

        return res.status(200).json({
            success: true,
            data: plans
        });
        
    } catch (error) {
        next(error);
    }
};