import { VehicleCategory } from "../../../../models/index.js";

export const deleteVehicleCategory = async (req, res, next) => {
    try {

        const { category_name } = req.params;
        const formattedCategoryName = category_name.toLowerCase().trim();

        const category = await VehicleCategory.findOne({
            where: { category_name: formattedCategoryName }
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: `Vehicle category '${formattedCategoryName}' not found.`
            });
        }

        await category.destroy();

        return res.status(200).json({
            success: true,
            message: `Vehicle category '${formattedCategoryName}' deleted successfully.`
        });

    } catch (error) {
        console.error("Error deleting vehicle category by name:", error);
        next(error); 
    }
};