import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const VehicleFuelType = seanebDB.define(
    "vehicle_fuel_type",
    {
        fuel_type_id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        fuel_name:{
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:true
        }
    },
    {
        tableName:"vehicle_fuel_type",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
        indexes:[
            {
                fields:["fuel_name"]
            }
        ]
    }
);

export default VehicleFuelType; 