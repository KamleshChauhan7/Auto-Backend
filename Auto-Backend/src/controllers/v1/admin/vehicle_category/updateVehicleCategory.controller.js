import { Op } from "sequelize";
import { VehicleCategory } from "../../../../models/index.js";
import { uploadBufferToSpaces } from "../../../../services/digital_ocean/uploadToSpaces.js";

export const updateVehicleCategory = async (req, res, next) => {
    try {
        const { currentCategoryName, new_category_name, description } = req.body;

        if (!currentCategoryName) {
            return res.status(400).json({
                success: false,
                message: "currentCategoryName is required"
            });
        }

        const category = await VehicleCategory.findOne({
            where: { category_name: currentCategoryName.toLowerCase().trim() }
        });
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: `Vehicle category '${currentCategoryName}' not found.`
            });
        }

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

        return res.status(200).json({
            success: true,
            message: "Vehicle category updated successfully.",
            data: category
        });

    } catch (error) {
        console.error("Error updating vehicle category by name:", error);
        next(error); 
    }
};