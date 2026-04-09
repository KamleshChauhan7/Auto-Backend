import { createCategoryService } from "../../../../services/admin/category/create.category.service.js";
import { ApiError } from "../../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../../errors/errorCodes.js";

export const createVehicleCategory = async (req, res, next) => {
    try {
        const { category_name, description } = req.body;

        if (!category_name) {
            throw new ApiError(ERROR_CODES.REQUIRED_FIELDS_MISSING);
        }

        const newCategory = await createCategoryService({ 
            category_name, 
            description 
        });

        return res.status(201).json({
            success: true,
            message: "Vehicle category created successfully.",
            data: newCategory
        });

    } catch (error) {
        if (error.status === 409) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }
        next(error); 
    }
};