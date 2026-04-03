import { VehicleCategory } from "../../../../models/index.js";
import { uploadBufferToSpaces } from "../../../../services/digital_ocean/uploadToSpaces.js";
import { ApiError } from "../../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../../errors/errorCodes.js";

export const createVehicleCategory = async (req, res, next) => {
    try {
        const { category_name, description } = req.body;
        // const file = req.file; 

        if (!category_name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required."
            });
        }

        // if (!file) {
        //      return res.status(400).json({
        //         success: false,
        //         message: "Category icon image is required."
        //     });
        // }

        // category name into lower case
        const formattedCategoryName = category_name.toLowerCase().trim();

        // Check for duplicates in DB
        const existingCategory = await VehicleCategory.findOne({
            where: { category_name: formattedCategoryName }
        });

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: `The category '${formattedCategoryName}' already exists.`
            });
        }

     
        const newCategory = await VehicleCategory.create({
            category_name: formattedCategoryName,
            // icon: "OLD URL", // Store the DO Spaces URL
            description: description 
        });

        return res.status(201).json({
            success: true,
            message: "Vehicle category created successfully.",
            data: newCategory
        });

    } catch (error) {
        console.error("Error creating vehicle category:", error);
        next(error); 
    }
};