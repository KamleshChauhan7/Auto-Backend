import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Vehicle_Model = seanebDB.define(
    "vehicle_models",
    {
        model_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        brand_id: {
            type: DataTypes.UUID,
            references: {
                model: "vehicle_brands",
                key: "brand_id"
            },
            allowNull: false,
            onDelete: "CASCADE"
        },
        model_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        tableName: "vehicle_models",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            { fields: ["brand_id"] },
            { fields: ["model_name"] }
        ]
    }
);

export default Vehicle_Model;