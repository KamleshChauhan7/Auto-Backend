import { ApiError } from "../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../errors/errorCodes.js";
import { PlanMaster } from "../../../models/index.js";

export const createPlanService = async ({ plan_name, price, duration_days }) => {

    const formatted_plan_name = plan_name.toLowerCase().trim();

    const newPlan = await PlanMaster.create({
        plan_name: formatted_plan_name,
        price,
        duration_days,
    });

    return newPlan;
};

export const fetchPlansService = async () => {

    const plans = await PlanMaster.findAll({
        order: [['price', 'ASC']]
    });

    return plans;
};


export const updatePlanService = async (payload) => {

    const { currentPlanName, new_plan_name, price, duration_days } = payload;

    const formattedCurrentName = currentPlanName.toLowerCase().trim();

    const plan = await PlanMaster.findOne({
        where: { plan_name: formattedCurrentName }
    });

    if (!plan) {
        throw new ApiError(ERROR_CODES.PLAN_NOT_FOUND);
    }

    let updateData = {};

    if (new_plan_name && new_plan_name.trim() !== "") {
        const formattedNewName = new_plan_name.toLowerCase().trim();

        if (formattedNewName !== formattedCurrentName) {
            const duplicateCheck = await PlanMaster.findOne({
                where: { plan_name: formattedNewName }
            });

            if (duplicateCheck) {
                throw new ApiError("DUPLICATE_NAME", `The plan name '${formattedNewName}' is already taken.`, 409);
            }

            updateData.plan_name = formattedNewName;
        }
    }

    if (price !== undefined) {
        updateData.price = price;
    }

    if (duration_days !== undefined) {
        updateData.duration_days = duration_days;
    }

    await plan.update(updateData);
    return plan;
};