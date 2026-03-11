import seanebDB from "../config/db.js";
import Branch from "./Branch.js"
import User from "./User.js";
import Plan_Master from "./Plan.Master.js";
import Opted_Plan from "./Opted.Plan.js";
import Car from "./Car.js"
import Enquiry from "./Enquiry.js";
import favorites from "./Favorites.js";
import Ratings from "./Ratings.js";
import Notification from "./Notification.js";
import Invoice from "./Invoice.js";
import Car_Images from "./Car.Images.js";
import Roles from "./Roles.js";
import User_Roles from "./User.Roles.js";
import Permissions from "./Permissions.js";
import Role_Permissions from "./Role.Permissions.js";
import Car_Model from "./Car.Models.js";
import Car_Brand from "./Car.Brand.js";
import CarFuelType from "./Car.Fuel.Type.js";

// Branch Relations
Branch.hasMany(Car,{foreignKey:"branch_id",onDelete:"CASCADE"});
Car.belongsTo(Branch,{foreignKey:"branch_id"});

Branch.hasMany(Car_Images,{foreignKey:"branch_id"});
Car_Images.belongsTo(Branch,{foreignKey:"branch_id"});

Branch.hasMany(Ratings,{foreignKey:"branch_id"});
Ratings.belongsTo(Branch,{foreignKey:"branch_id"});

Branch.hasMany(Invoice,{foreignKey:"branch_id"});
Invoice.belongsTo(Branch,{foreignKey:"branch_id"});

Branch.hasMany(Opted_Plan,{foreignKey:"branch_id"});
Opted_Plan.belongsTo(Branch,{foreignKey:"branch_id"});

Branch.hasMany(User_Roles,{foreignKey:"branch_id"});
User_Roles.belongsTo(Branch,{foreignKey:"branch_id"});


// Car Relations

Car.hasMany(Car_Images,{foreignKey:"car_id",onDelete:"CASCADE"});
Car_Images.belongsTo(Car,{foreignKey:"car_id"});

Car.hasMany(Enquiry,{foreignKey:"car_id"});
Enquiry.belongsTo(Car,{foreignKey:"car_id"});

Car.hasMany(Notification,{foreignKey:"car_id"});
Notification.belongsTo(Car,{foreignKey:"car_id"});

Car.hasMany(Invoice,{foreignKey:"car_id"});
Invoice.belongsTo(Car,{foreignKey:"car_id"});

Car.hasOne(Opted_Plan,{foreignKey:"car_id"});
Opted_Plan.belongsTo(Car,{foreignKey:"car_id"});

// User Relations

User.hasMany(Enquiry,{foreignKey:"user_id"});
Enquiry.belongsTo(User,{foreignKey:"user_id"});

User.hasMany(Ratings,{foreignKey:"user_id"});
Ratings.belongsTo(User,{foreignKey:"user_id"});

User.hasMany(Notification,{foreignKey:"user_id"});
Notification.belongsTo(User,{foreignKey:"user_id"});

User.hasMany(Invoice,{foreignKey:"user_id"});
Invoice.belongsTo(User,{foreignKey:"user_id"});

User.hasMany(favorites,{foreignKey:"user_id"});
favorites.belongsTo(User,{foreignKey:"user_id"});

Car.hasMany(favorites,{foreignKey:"car_id"});
favorites.belongsTo(Car,{foreignKey:"car_id"});

User.belongsToMany(Roles,{through:User_Roles,foreignKey:"user_id"});
Roles.belongsToMany(User,{through:User_Roles,foreignKey:"role_id"});


// Car Brand relations
Car_Brand.hasMany(Car_Model,{foreignKey:"brand_id"});
Car_Model.belongsTo(Car_Brand,{foreignKey:"brand_id"});

Car_Model.hasMany(Car,{foreignKey:"model_id"});
Car.belongsTo(Car_Model,{foreignKey:"model_id"});

// Car Fuel Relations
CarFuelType.hasMany(Car,{foreignKey:"fuel_type_id"});
Car.belongsTo(CarFuelType,{foreignKey:"fuel_type_id"});

// Plan Relations
Plan_Master.hasMany(Opted_Plan,{foreignKey:"plan_id"});
Opted_Plan.belongsTo(Plan_Master,{foreignKey:"plan_id"});

// Role & PErmissions Relations
Roles.belongsToMany(Permissions,{through:Role_Permissions , foreignKey:"role_id"});
Permissions.belongsToMany(Roles,{through:Role_Permissions,foreignKey:"permission_id"});



export {
    seanebDB,
    Branch,
    User,
    Plan_Master,
    Car,
    Opted_Plan,
    Enquiry,
    favorites,
    Ratings,
    Notification,
    Invoice,
    Car_Images,
    Roles,
    User_Roles,
    Permissions,
    Role_Permissions
};