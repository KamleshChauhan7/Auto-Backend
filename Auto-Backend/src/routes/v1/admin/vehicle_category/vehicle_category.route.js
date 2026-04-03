import { Router } from "express";
import { syncGatewayIdentity } from "../../../../middlewares/gatewaySync.middleware.js";
import { createVehicleCategory } from "../../../../controllers/v1/admin/vehicle_category/addVehicleCategory.controller.js"
import { updateVehicleCategory } from "../../../../controllers/v1/admin/vehicle_category/updateVehicleCategory.controller.js";
import { deleteVehicleCategory } from "../../../../controllers/v1/admin/vehicle_category/deleteVehicleCategory.controller.js";
import { getAllVehicleCategories } from "../../../../controllers/v1/admin/vehicle_category/getAllCategory.controller.js";


const router = Router();

router.post(
    "/create",
    syncGatewayIdentity,
    createVehicleCategory,
)

router.get(
    "/getAll",
    getAllVehicleCategories
)

router.put(
    "/update-category",
    updateVehicleCategory
);

router.delete(
    "/delete/:category_name",
    deleteVehicleCategory
)

export default router;