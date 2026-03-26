import { fetchRCDetailsFromCashfree } from "../../../services/vehicle/get.vehicle.data.RC.js";

export const verifyVehicleRC = async (req, res, next) => {
    try {
        const { vehicle_number } = req.body;

        if (!vehicle_number) {
            return res.status(400).json({ 
                success: false, 
                message: "Vehicle registration number is required." 
            });
        }

        // Call the service
        const result = await fetchRCDetailsFromCashfree(vehicle_number);

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};