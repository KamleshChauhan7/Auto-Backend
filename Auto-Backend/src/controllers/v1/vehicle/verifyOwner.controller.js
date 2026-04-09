import { RcVehicleMaster, VehicleFuelType, VehicleModel } from "../../../models/index.js";
import { ApiError } from "../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../errors/errorCodes.js";

export const verifyOwner = async (req, res) => {
  try {
    const { reg_no, firstName, lastName } = req.body;

    // Validate inputs
    if (!reg_no) {
      throw new ApiError(ERROR_CODES.VEHICLE_REGISTRATION_NUMBER_NOT_FOUND);
    }

    if (!firstName || !lastName) {
      throw new ApiError(ERROR_CODES.REQUIRED_FIELDS_MISSING);
    }

    // Fetch RC details from the database
    const vehicleData = await RcVehicleMaster.findOne({
      where: {
        reg_no: reg_no.toUpperCase().trim(),
      },
    });

    const fuelData = await VehicleFuelType.findOne({
      where: {
        fuel_type_id: vehicleData.fuel_type_id
      }
    })

    const vehicleModel = await VehicleModel.findOne({
      where:{
        model_id:vehicleData.model_id
      }
    })

    if (!vehicleData) {
      return res.status(404).json({
        success: false,
        message: `RC details Not found for registration number: ${reg_no}`,
      });
    }

    if (!fuelData) {
      return res.status(404).json({
        success: false,
        message: "Fuel Type Not Found"
      })
    }

    if(!vehicleModel)
    {
      return res.status(404).json({
        success:false,
        message:"Vehicle Model Not Found"
      })
    }

    const officialOwnerName = vehicleData.owner_name.toLowerCase();
    const inputFirstName = firstName.toLowerCase().trim();
    const inputLastName = lastName.toLowerCase().trim();

    const isFirstNamePresent = officialOwnerName.includes(inputFirstName);
    const isLastNamePresent = officialOwnerName.includes(inputLastName);

    // Handle Verification Failure
    if (!isFirstNamePresent || !isLastNamePresent) {
      return res.status(400).json({
        success: false,
        message: "Verification failed. The provided name does not match",
      });
    }

    const vehicle_manufacturer_name = vehicleData.vehicle_manufacturer_name;
    const manufacturer = vehicle_manufacturer_name.split(" ")[0];
    const vehicle_name = manufacturer + " " + vehicleModel.model_name ;

    // Return success response if verification pass
    return res.status(200).json({
      success: true,
      message: "Owner verified successfully.",
      data: {
        reg_no: vehicleData.reg_no,
        vehicle_name,
        reg_year: vehicleData.registration_date,
        fuel_type: fuelData.fuel_name,
        engine_capacity: vehicleData.vehicle_cubic_capacity+"CC",
        ownership: vehicleData.owner_count,
        color: vehicleData.color,
        pucc_no: vehicleData.pucc_no,
        seater: vehicleData.seat_capacity,
        insurance: vehicleData.insurance_policy_no ? 'YES' : 'NO'
        // vehicle_name:
      },
    });

  } catch (error) {
    console.error("Error verifying owner:", error);

    // Handle server errors
    return res.status(500).json({
      success: false,
      message: "An error occurred while verifying RC details.",
      error: error.message,
    });
  }
};