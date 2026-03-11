import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const CarFuelType = seanebDB.define(
    "car_fuel_type",
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
        tableName:"car_fuel_type",
        timestamps:true,
        createdAt:"creaated_at",
        updatedAt:"updated_at"
    }
);

export default CarFuelType; 