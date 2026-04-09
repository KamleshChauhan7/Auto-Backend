import { ERROR_CODES } from "../../../errors/errorCodes.js";
import { ApiError } from "../../../errors/ApiError.js";
import { VehicleCategory } from "../../../models/index.js";

export const deleteVehicleCategoryService = async (payload) => {

    const { category_name } = payload;

    if(!category_name){
        throw new ApiError(ERROR_CODES.REQUIRED_FIELDS_MISSING);
    }

    const formattedCategoryName = category_name.toLowerCase().trim();

    const category = await VehicleCategory.findOne({
        where: { category_name: formattedCategoryName }
    });

    if (!category) {
        throw new ApiError(ERROR_CODES.REQUIRED_FIELDS_MISSING);
    }

    await category.destroy();

}