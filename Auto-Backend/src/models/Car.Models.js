import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Car_Model = seanebDB.define(
    "car_models",
    {
        model_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        brand_id: {
            type: DataTypes.UUID,
            references: {
                model: "car_brands",
                key: "brand_id"
            },
            allowNull: false,
            onDelete: "CASCADE"
        },
        model_name:{
            type:DataTypes.STRING(50),
            allowNull:false
        }
    },
    {
        tableName:"car_models",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
);

export default Car_Model;