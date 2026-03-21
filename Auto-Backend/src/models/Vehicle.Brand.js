import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Vehicle_Brand = seanebDB.define(
    "vehicle_brands",
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
        tableName:"vehicle_brands",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
        indexes:[
            {
                fields:["brand_name"]
            }
        ]
    }
)


export default Vehicle_Brand;