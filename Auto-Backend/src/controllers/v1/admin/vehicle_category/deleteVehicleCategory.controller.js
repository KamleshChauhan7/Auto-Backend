import { deleteVehicleCategoryService } from "../../../../services/admin/category/delete.category.service.js";

export const deleteVehicleCategory = async (req, res, next) => {
    try {

        const { category_name } = req.params;

        await deleteVehicleCategoryService({category_name});

        return res.status(200).json({
            success: true,
            message: `Vehicle category '${formattedCategoryName}' deleted successfully.`
        });

    } catch (error) {
        console.error("Error deleting vehicle category by name:", error);
        next(error); 
    }
};