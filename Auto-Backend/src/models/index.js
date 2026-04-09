import sequelize from "../config/db.js";

// Import all models
import Branches from "./Branches.js";
import User from "./User.js";
import Vehicle from "./Vehicles.js";
import VehicleCategory from "./Vehicle.Category.js";
import VehicleBrand from "./Vehicle.Brand.js";
import VehicleFuelType from "./Vehicle.Fuel.Type.js";
import VehicleModel from "./Vehicle.Models.js";
import VehicleImages from "./Vehicle.Images.js";

import Enquiry from "./Enquiry.js";
import Favorites from "./Favorites.js";
import Ratings from "./Ratings.js";
import Notification from "./Notification.js";

import PlanMaster from "./Plan.Master.js";
import OptedPlan from "./Opted.Plan.js";
import Invoice from "./Invoice.js";

import Roles from "./Roles.js";
import Permissions from "./Permissions.js";
import RolePermissions from "./Role.Permissions.js";
import UserRoles from "./User.Roles.js";

import UserVehicle from "./User.Vehicle.js";
import UserVehicleDealer from "./User.Vehicle.Dealer.js";

import VehiclePermit from "./Vehicle.Permit.js";

import CreditBalance from "./CreditBalance.js";
import PaymentTransaction from "./PaymentTransaction.js";

import RcVehicleMaster from "./RcVehicleMaster.js"



// Branch -- Vehicles
Branches.hasMany(Vehicle, { foreignKey: "branch_id" });
Vehicle.belongsTo(Branches, { foreignKey: "branch_id" });

RcVehicleMaster.belongsTo(VehicleBrand, { foreignKey: "brand_id", as: "brand" });
RcVehicleMaster.belongsTo(VehicleModel, { foreignKey: "model_id", as: "model" });
RcVehicleMaster.belongsTo(VehicleFuelType, { foreignKey: "fuel_type_id", as: "fuel" });
Vehicle.belongsTo(VehicleCategory, { foreignKey: "category_id", as: "category" });

// Vehicle Category
VehicleCategory.hasMany(Vehicle, { foreignKey: "category_id" });


// Vehicle Brand --  Model
VehicleBrand.hasMany(VehicleModel, { foreignKey: "brand_id" });
VehicleModel.belongsTo(VehicleBrand, { foreignKey: "brand_id" });


// Vehicle Model -- Vehicle
VehicleModel.hasMany(RcVehicleMaster, { foreignKey: "model_id" });


// Fuel Type
VehicleFuelType.hasMany(RcVehicleMaster, { foreignKey: "fuel_type_id" });



// Vehicle Images
Vehicle.hasMany(VehicleImages, { foreignKey: "vehicle_id", as: "images" });
VehicleImages.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

// Enquiry
User.hasMany(Enquiry, { foreignKey: "user_id" });
Enquiry.belongsTo(User, { foreignKey: "user_id" });

Vehicle.hasMany(Enquiry, { foreignKey: "vehicle_id" });
Enquiry.belongsTo(Vehicle, { foreignKey: "vehicle_id" });


// Favorites
User.hasMany(Favorites, { foreignKey: "user_id" });
Favorites.belongsTo(User, { foreignKey: "user_id" });

Vehicle.hasMany(Favorites, { foreignKey: "vehicle_id" });
Favorites.belongsTo(Vehicle, { foreignKey: "vehicle_id" });


// Ratings
User.hasMany(Ratings, { foreignKey: "user_id" });
Ratings.belongsTo(User, { foreignKey: "user_id" });

Branches.hasMany(Ratings, { foreignKey: "branch_id" });
Ratings.belongsTo(Branches, { foreignKey: "branch_id" });


// Notifications
User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

Vehicle.hasMany(Notification, { foreignKey: "vehicle_id" });
Notification.belongsTo(Vehicle, { foreignKey: "vehicle_id" });


// Plan -- OptedPlan
PlanMaster.hasMany(OptedPlan, { foreignKey: "plan_id" });
OptedPlan.belongsTo(PlanMaster, { foreignKey: "plan_id" });

Vehicle.hasMany(OptedPlan, { foreignKey: "vehicle_id" });
OptedPlan.belongsTo(Vehicle, { foreignKey: "vehicle_id" });


// Invoice
Vehicle.hasMany(Invoice, { foreignKey: "vehicle_id" });
Invoice.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

User.hasMany(Invoice, { foreignKey: "user_id" });
Invoice.belongsTo(User, { foreignKey: "user_id" });

OptedPlan.hasMany(Invoice, { foreignKey: "opted_plan_id" });
Invoice.belongsTo(OptedPlan, { foreignKey: "opted_plan_id" });


// Role -- Permission (Many-to-Many)
Roles.belongsToMany(Permissions, {
  through: RolePermissions,
  foreignKey: "role_id",
});
Permissions.belongsToMany(Roles, {
  through: RolePermissions,
  foreignKey: "permission_id",
});


// User -- Role (with branch + product context)
User.hasMany(UserRoles, { foreignKey: "user_id" });
UserRoles.belongsTo(User, { foreignKey: "user_id" });

Branches.hasMany(UserRoles, { foreignKey: "branch_id" });
UserRoles.belongsTo(Branches, { foreignKey: "branch_id" });

Roles.hasMany(UserRoles, { foreignKey: "role_id" });
UserRoles.belongsTo(Roles, { foreignKey: "role_id" });


// User -- UserVehicle
User.hasMany(UserVehicle, { foreignKey: "user_id" });
UserVehicle.belongsTo(User, { foreignKey: "user_id" });

// Vehicle -- UserVehicle
Vehicle.hasMany(UserVehicle, { foreignKey: "vehicle_id" });
UserVehicle.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

// UserVehicle -- Dealer mapping
UserVehicle.hasMany(UserVehicleDealer, { foreignKey: "user_vehicle_id" });
UserVehicleDealer.belongsTo(UserVehicle, { foreignKey: "user_vehicle_id" });

// Branch -- Dealer mapping
Branches.hasMany(UserVehicleDealer, { foreignKey: "branch_id" });
UserVehicleDealer.belongsTo(Branches, { foreignKey: "branch_id" });

//vehicle permit
RcVehicleMaster.hasOne(VehiclePermit, { foreignKey: "vehicle_id", as: "permit" });
VehiclePermit.belongsTo(RcVehicleMaster, { foreignKey: "vehicle_id" });

// Branch -- Credit Balance
Branches.hasOne(CreditBalance, { foreignKey: "branch_id" });
CreditBalance.belongsTo(Branches, { foreignKey: "branch_id" });

// Branch -- Credit Transactions
Branches.hasMany(PaymentTransaction, { foreignKey: "branch_id" });
PaymentTransaction.belongsTo(Branches, { foreignKey: "branch_id" });

// Vehicle -- Credit Transactions (for tracking which post used which credit)
Vehicle.hasMany(PaymentTransaction, { foreignKey: "vehicle_id" });
PaymentTransaction.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

RcVehicleMaster.hasMany(Vehicle, { foreignKey: "rc_master_id", as: "listings" });
Vehicle.belongsTo(RcVehicleMaster, { foreignKey: "rc_master_id", as: "rc_data" });


export {
  sequelize,

  // Core
  Branches,
  User,

  // Vehicles
  Vehicle,
  VehicleCategory,
  VehicleBrand,
  VehicleFuelType,
  VehicleModel,
  VehicleImages,
  VehiclePermit,

  // User actions
  Enquiry,
  Favorites,
  Ratings,
  Notification,

  // Plans & billing
  PlanMaster,
  OptedPlan,
  Invoice,

  // RBAC
  Roles,
  Permissions,
  RolePermissions,
  UserRoles,

  UserVehicleDealer,
  UserVehicle,

  PaymentTransaction,
  CreditBalance,

  RcVehicleMaster,

};