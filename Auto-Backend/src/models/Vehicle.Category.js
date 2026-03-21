import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Vehicle_Category = seanebDB.define(
    "vehicle_category",
    {
            category_id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            category_name:{
                type:DataTypes.STRING(50),
                allowNull:false,
                unique:true
            },
            description: {
                type:DataTypes.TEXT,
            }
    },
    {
        tableName:"vehicle_category",
        timestamps:true,
        paranoid:true,
        indexes:[
            {
                fields:["category_name"]
            }
        ]
    }
);

export default Vehicle_Category;