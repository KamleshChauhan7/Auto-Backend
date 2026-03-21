import { Vehicle, VehicleBrand } from "../../../models/index.js"; // Using your clean path alias
import { ApiError } from "../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../errors/errorCodes.js";
import { addUser } from "../User/addUser.js"
export const addCarBrand = async (req, res, next) => {
    try {
        // Validate that the user context exists (from your auth middleware)
        if (!req.user || !req.user.user_id) {
            throw new ApiError(ERROR_CODES.UNAUTHORIZED);
        }

        const userId = req.user.user_id;
        // console.log("User ID:", userId);
        // Add User if Not Exist    q
        await addUser(userId);

        // Destructure the required fields from the request body
        const {
            brand_name
        } = req.body;

        if (!brand_name || brand_name === "") {
            throw new ApiError(ERROR_CODES.REQUIRED_FIELDS_MISSING);
        }

        // Execute the Create Query
        const newCar = await VehicleBrand.create({
            brand_name
            // In a real scenario, you might want a 'created_by' or 'dealer_id' column 
            // in this model that stores req.user.user_id
        });

        // Send the response
        return res.status(201).json({
            success: true,
            message: "Vehicle brand added successfully",
            data: newCar
        });

    } catch (error) {
        // Handle Unique Constraint error for car_register_number
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                success: false,
                message: "Vehicle Brand already exists"
            });
        }
        next(error);
    }
};