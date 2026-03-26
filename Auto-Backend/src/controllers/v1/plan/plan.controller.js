import { PlanMaster } from "../../../models/index.js";
import { ApiError } from "../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../errors/errorCodes.js";

// Add a new Plan
export const addPlan = async (req, res, next) => {
    try {
        const { plan_name, price, duration_days } = req.body;

        // Basic Validation
        if (!plan_name || price === undefined || !duration_days) {
            throw new ApiError(ERROR_CODES.REQUIRED_FIELDS_MISSING);
        }

        const newPlan = await PlanMaster.create({
            plan_name,
            price,
            duration_days,
        });

        return res.status(201).json({
            success: true,
            message: "Subscription plan created successfully",
            data: newPlan
        });

    } catch (error) {
        next(error);
    }
};

// Get all Plans 
export const getAllPlans = async (req, res, next) => {
    try {
        const { active_only } = req.query;
        
        const filter = {};
        if (active_only === 'true') {
            filter.is_active = true;
        }

        const plans = await PlanMaster.findAll({
            where: filter,
            order: [['price', 'ASC']]
        });

        return res.status(200).json({
            success: true,
            count: plans.length,
            data: plans
        });
    } catch (error) {
        next(error);
    }
};