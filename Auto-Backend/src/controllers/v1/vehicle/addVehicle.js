import seanebDB from "../../../config/db.js";
import {
    Vehicle, VehicleBrand, VehicleCategory,
    VehicleFuelType, VehicleModel, VehicleImages, VehiclePermit
} from "../../../models/index.js";
import { fetchRCDetailsFromCashfree } from "../../../services/vehicle/get.vehicle.data.RC.js";
import { ApiError } from "../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../errors/errorCodes.js";

export const addVehicle = async (req, res, next) => {
    const t = await seanebDB.transaction();

    try {
        const {
            vehicle_register_number, 
            vehicle_category,
            owner_name,              
            price,                   
            km_driven,               
            description,             
            transmission,            
            image,                   
        } = req.body;

        // Fetch Official RC Data
        const rcResult = await fetchRCDetailsFromCashfree(vehicle_register_number);

        if (!rcResult.success) {
            throw new ApiError(ERROR_CODES.VEHICLE_NOT_VERIFIED);
        }

        const apiData = rcResult.data;

        // Verify Owner Name (Case-insensitive match)
        const officialOwner = apiData.owner?.toUpperCase().trim();
        const inputOwner = owner_name?.toUpperCase().trim();

        // Check if input name is contained within the official name or vice versa
        if (!officialOwner.includes(inputOwner) && !inputOwner.includes(officialOwner)) {
            throw new ApiError(ERROR_CODES.OWNER_MISMATCH);
        }

        const branch_id = req.branch.branch_id;

        // Resolve Lookup IDs from API Data (findOrCreate)
        // Note: Using API data for names to ensure database consistency with RTO records
        
        const [category] = await VehicleCategory.findOrCreate({
            where: { category_name: vehicle_category },
            defaults: { icon: 'default_category_icon' },
            transaction: t
        });

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

        // Create Main Vehicle Record
        const addVehicle = await Vehicle.create({
            branch_id,
            brand_id: brand.brand_id,
            model_id: model.model_id,
            category_id: category.category_id,
            fuel_type_id: fuel.fuel_type_id,

            // Official RC Data
            reg_no: apiData.reg_no,
            chassis_no: apiData.chassis,
            engine_no: apiData.engine,
            owner_name: officialOwner, // Save the official RTO name
            owner_father_name:apiData.owner_father_name,
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
            vehicle_manufacturer_name:apiData.vehicle_manufacturer_name,
            manufacturing_month_year:apiData.vehicle_manufacturing_month_year,

            // Insurance & Paperwork
            insurance_company: apiData.vehicle_insurance_company_name,
            insurance_policy_no: apiData.vehicle_insurance_policy_number,
            insurance_expiry: apiData.vehicle_insurance_upto,
            pucc_no: apiData.pucc_number,
            pucc_expiry: apiData.pucc_upto,
            financer: apiData.rc_financer,

            // Dealer Marketplace Data
            price,
            km_driven,
            transmission,
            description,
        }, { transaction: t });

        // Create Vehicle Permit Details
        if (apiData.is_commercial || apiData.permit_number) {
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

        // Handle Vehicle Image
        if (image) {
            await VehicleImages.create({
                vehicle_id: addVehicle.vehicle_id,
                image_url: image,
            }, { transaction: t });
        }

        // Finalize Transaction
        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Vehicle verified and saved successfully",
            vehicle_id: addVehicle.vehicle_id,
            owner_confirmed: officialOwner
        });

    } catch (error) {
        await t.rollback();
        next(error);
    }
};