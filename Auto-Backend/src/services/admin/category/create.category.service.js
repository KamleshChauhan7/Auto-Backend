import { VehicleCategory } from "../../../models/index.js";

export const createCategoryService = async (payload) => {
    const { category_name, description } = payload;
    
    const formattedCategoryName = category_name.toLowerCase().trim();

    const existingCategory = await VehicleCategory.findOne({
        where: { category_name: formattedCategoryName }
    });

    if (existingCategory) {
        const error = new Error(`The category '${formattedCategoryName}' already exists.`);
        error.status = 409;
        throw error;
    }

    const newCategory = await VehicleCategory.create({
        category_name: formattedCategoryName,
        description: description 
    });

    return newCategory;
};