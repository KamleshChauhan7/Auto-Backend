import seanebDB from "../../../config/db.js";
import {
    RcVehicleMaster, VehicleBrand, VehicleCategory,
    VehicleFuelType, VehicleModel, VehicleImages, VehiclePermit
} from "../../../models/index.js";
import { fetchRCDetailsFromCashfree } from "../../../services/vehicle/get.vehicle.data.RC.js";
import { ApiError } from "../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../errors/errorCodes.js";


const formatRTODate = (dateStr) => {
    if (!dateStr || dateStr === "NA" || dateStr === "" || dateStr === "null") return null;

    // Handle MM/YYYY format (e.g., "12/2021" -> "2021-12-01")
    if (dateStr.includes('/')) {
        const [month, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-01`;
    }

    // Ensure the date is actually valid before sending to DB
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : dateStr;
};

function maskName(name) {
    return name
        .split(" ")
        .map(word => {
            if (word.length <= 2) return word; // handle small words
            return (
                word[0] +
                "*".repeat(word.length - 2) +
                word[word.length - 1]
            );
        })
        .join(" ");
}


export const getOwner = async (req, res, next) => {
    const t = await seanebDB.transaction();

    try {
        const { reg_no } = req.body;

        // Fetch Official RC Data
        const rcResult = await fetchRCDetailsFromCashfree(reg_no);

        if (!rcResult.success) {
            throw new ApiError(ERROR_CODES.VEHICLE_NOT_VERIFIED);
        }

        const apiData = rcResult.data;

        // Verify Owner Name (Case-insensitive match)
        const officialOwner = apiData.owner?.toUpperCase().trim();

        // get brand name from vehicle manufacture name
        const manufacturerName = apiData.vehicle_manufacturer_name;
        const vehicleBrand = manufacturerName.split(" ")[0];

        const [brand] = await VehicleBrand.findOrCreate({
            where: { brand_name: vehicleBrand },
            transaction: t
        });

        const [fuel] = await VehicleFuelType.findOrCreate({
            where: { fuel_name: apiData.type },
            transaction: t
        });

        const [model] = await VehicleModel.findOrCreate({
            where: {
                model_name: apiData.model,
                brand_id: brand.brand_id
            },
            transaction: t
        });

        // Create or Find Main Vehicle Record
        const [addVehicle, isCreated] = await RcVehicleMaster.findOrCreate({
            where: { 
                reg_no: apiData.reg_no.toUpperCase() 
            },
            defaults: {
                brand_id: brand.brand_id,
                model_id: model.model_id,
                fuel_type_id: fuel.fuel_type_id,

                // Official RC Data
                chassis_no: apiData.chassis,
                engine_no: apiData.engine,
                owner_name: officialOwner, // Save the official RTO name
                owner_father_name: apiData.owner_father_name,
                owner_count: parseInt(apiData.owner_count),
                rc_status: apiData.rc_status,
                registration_date: apiData.reg_date,
                rc_expiry_date: apiData.rc_expiry_date,
                reg_authority: apiData.reg_authority,

                // Tech Specs
                body_type: apiData.body_type,
                color: apiData.vehicle_colour,
                seat_capacity: parseInt(apiData.vehicle_seat_capacity),
                is_commercial: apiData.is_commercial || false,
                vehicle_manufacturer_name: apiData.vehicle_manufacturer_name,
                manufacturing_month_year: formatRTODate(apiData.vehicle_manufacturing_month_year),
                
                // Insurance & Paperwork
                insurance_company: apiData.vehicle_insurance_company_name,
                insurance_policy_no: apiData.vehicle_insurance_policy_number,
                insurance_expiry: apiData.vehicle_insurance_upto,
                pucc_no: apiData.pucc_number,
                pucc_expiry: apiData.pucc_upto,
                financer: apiData.rc_financer,

                vehicle_cubic_capacity: parseInt(apiData.vehicle_cubic_capacity) || null,
                gross_vehicle_weight: parseInt(apiData.gross_vehicle_weight) || null,
                unladen_weight: parseInt(apiData.unladen_weight) || null,
                vehicle_category: apiData.vehicle_category,
                vehicle_cylinders_no: parseInt(apiData.vehicle_cylinders_no) || null,
            },
            transaction: t 
        });

        // Only create Vehicle Permit Details IF the vehicle was newly created in the DB
        if (isCreated && (apiData.is_commercial || apiData.permit_number)) {
            await VehiclePermit.create({
                vehicle_id: addVehicle.vehicle_id,
                permit_number: apiData.permit_number,
                permit_type: apiData.permit_type,
                permit_issue_date: apiData.permit_issue_date,
                permit_valid_from: apiData.permit_valid_from,
                permit_valid_upto: apiData.permit_valid_upto,
                national_permit_number: apiData.national_permit_number,
                national_permit_upto: apiData.national_permit_upto,
                national_permit_issued_by: apiData.national_permit_issued_by,
                non_use_status: apiData.non_use_status,
                is_commercial: apiData.is_commercial,
                noc_details: apiData.noc_details
            }, { transaction: t });
        }

        // Finalize Transaction
        await t.commit();

        return res.status(isCreated ? 201 : 200).json({
            success: true,
            message: isCreated ? "Vehicle Information Fetched and Saved" : "Vehicle Information Found in Database",
            owner_name: maskName(officialOwner) // or maskName(addVehicle.owner_name)
        });

    } catch (error) {
        await t.rollback();
        next(error);
    }
};