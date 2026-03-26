import { Branches } from "../../models/index.js";
import { ApiError } from "../../errors/ApiError.js";
import { ERROR_CODES } from "../../errors/errorCodes.js";

export const addBranch = async (branchId) => { 
    try {

        const isExist = await Branches.findOne({ 
            where: { central_user_id: userId } 
        });

        if (!isExist) {
            await User.create({
                central_branch_id: branchId,
            });
            console.log("Branch added successfully");
        }
        
    } catch (e) {
        console.error("Error in addBranch:", e);
    }
}