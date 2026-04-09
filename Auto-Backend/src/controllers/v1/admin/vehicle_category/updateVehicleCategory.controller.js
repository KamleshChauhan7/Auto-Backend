import { updateCategorySerivice } from "../../../../services/admin/category/update.category.service.js"

export const updateVehicleCategory = async (req, res, next) => {
    try {
        const { currentCategoryName, new_category_name, description } = req.body;

        if (!currentCategoryName) {
            return res.status(400).json({
                success: false,
                message: "currentCategoryName is required"
            });
        }

        const updatedCategory = await updateCategorySerivice({
            currentCategoryName,
            new_category_name,
            description
        });

        return res.status(200).json({
            success: true,
            message: "Vehicle category updated successfully.",
            data: updatedCategory
        });

    } catch (error) {
        console.error("Error updating vehicle category by name:", error);
        next(error);
    }
};