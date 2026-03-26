import {
    Vehicle, VehicleBrand, VehicleModel,
    VehicleFuelType, VehicleCategory, VehicleImages
} from "../../../models/index.js";
import { ApiError } from "../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../errors/errorCodes.js";

export const getVehicleDetails = async (req, res, next) => {
    try {
        const { vehicle_id } = req.params;

        const vehicle = await Vehicle.findByPk(vehicle_id, {
            include: [
                { model: VehicleBrand, attributes: ['brand_name'] },
                { model: VehicleModel, attributes: ['model_name'] },
                { model: VehicleFuelType, attributes: ['fuel_name'] },
                { model: VehicleCategory, attributes: ['category_name'] },
                { model: VehicleImages, attributes: ['image_url'] }
            ]
        });

        if (!vehicle) {
            throw new ApiError(ERROR_CODES.VEHICLE_NOT_FOUND);
        }

        const formattedResponse = {

            title: `${vehicle.vehicle_brand.brand_name} ${vehicle.vehicle_model.model_name}`,
            description: vehicle.description,
            price: vehicle.price,
            miles: vehicle.km_driven,
            fuel_type: vehicle.vehicle_fuel_type.fuel_name,
            register_year: vehicle.registration_date, // e.g., Jun 2018
            body: vehicle.body_type,
            transmission: vehicle.transmission,
            fuel_type: vehicle.vehicle_fuel_type.fuel_name,
            color: vehicle.color,
            seats: `${vehicle.seat_capacity} Seats`,
            insurance_validity: vehicle.insurance_expiry || "N/A",
            mileage: vehicle.km_driven,
            ownership: vehicle.owner_count === 1 ? "First Owner" : `${vehicle.owner_count} Owner`,

            images: vehicle.vehicle_images.map(img => img.image_url)
        };

        return res.status(200).json({
            success: true,
            data: formattedResponse
        });

    } catch (error) {
        next(error);
    }
};