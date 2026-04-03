import { PlanMaster } from "../../../../models/index.js";
import { ApiError } from "../../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../../errors/errorCodes.js";

export const updatePlan = async (req, res, next) => {
    try {


        const { currentPlanName, new_plan_name, price, duration_days } = req.body;

        const plan = await PlanMaster.findOne({
            where: { plan_name: currentPlanName.toLowerCase().trim() }
        });

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: `Subscription plan '${currentPlanName}' not found.`
            });
        }

        let updateData = {};

        if (new_plan_name && new_plan_name.trim() !== "") {
            const formattedNewName = new_plan_name.toLowerCase().trim();

            if (formattedNewName !== currentPlanName) {
                const duplicateCheck = await PlanMaster.findOne({
                    where: { plan_name: formattedNewName }
                });

                if (duplicateCheck) {
                    return res.status(409).json({
                        success: false,
                        message: `The plan name '${formattedNewName}' is already taken.`
                    });
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

        return res.status(200).json({
            success: true,
            message: "Subscription plan updated successfully.",
            data: plan
        });

    } catch (error) {
        console.error("Error updating subscription plan:", error);
        next(error);
    }
};