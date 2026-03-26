import { User } from "../../models/index.js";
import { ApiError } from "../../errors/ApiError.js";
import { ERROR_CODES } from "../../errors/errorCodes.js";

export const addUser = async (userId) => { 
    try {

        const isExist = await User.findOne({ 
            where: { central_user_id: userId } 
        });

        if (!isExist) {
            await User.create({
                central_user_id: userId,
            });
            console.log("User added successfully");
        }
        
    } catch (e) {
        console.error("Error in addUser:", e);
    }
}