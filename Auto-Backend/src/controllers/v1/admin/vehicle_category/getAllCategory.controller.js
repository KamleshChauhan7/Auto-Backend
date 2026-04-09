import { VehicleCategory } from "../../../../models/index.js";

export const getAllVehicleCategories = async (req, res, next) => {
    try {
        
        const categories = await VehicleCategory.findAll();

        return res.status(200).json({
            success: true,
            message: "Vehicle categories fetched successfully.",
            data: categories
        });

    } catch (error) {
        console.error("Error fetching vehicle categories:", error);
        next(error); 
    }
};