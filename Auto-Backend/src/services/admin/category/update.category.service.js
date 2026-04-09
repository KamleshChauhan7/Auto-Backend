import { VehicleCategory } from "../../../models/index.js";
import { ERROR_CODES } from "../../../errors/errorCodes.js";
import { ApiError } from "../../../errors/ApiError.js";

export const updateCategorySerivice = async (payload) => {

    const {currentCategoryName, new_category_name, description} = payload;

    const category = await VehicleCategory.findOne({
        where: { category_name: currentCategoryName.toLowerCase().trim() }
    });

    if (!category) {
        throw new ApiError(ERROR_CODES.CATEGORY_NOT_EXIST);
        };


    let updateData = {};

    if (new_category_name && new_category_name.trim() !== "") {
        const formattedNewName = new_category_name.toLowerCase().trim();

        // Make sure they aren't just sending the exact same name
        if (formattedNewName !== currentCategoryName.toLowerCase().trim()) {
            const duplicateCheck = await VehicleCategory.findOne({
                where: { category_name: formattedNewName }
            });

            if (duplicateCheck) {
                return res.status(409).json({
                    success: false,
                    message: `The category name '${formattedNewName}' is already taken.`
                });
            }

            updateData.category_name = formattedNewName;
        }
    }

    if (description !== undefined) {
        updateData.description = description;
    }

    await category.update(updateData);
    return category;

}