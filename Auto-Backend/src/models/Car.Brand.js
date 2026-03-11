import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Car_Brand = seanebDB.define(
    "car_brands",
    {
        brand_id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        brand_name:{
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:true
        }
    },
    {
        tableName:"car_brands",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
)


export default Car_Brand;