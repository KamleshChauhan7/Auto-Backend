import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";


const favorites = seanebDB.define(
    "favorites",
    {
        favorites_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id"
            },
            onDelete: "CASCADE"
        },
        vehicle_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "vehicles",
                key: "vehicle_id"
            }
        }
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ["user_id", "vehicle_id"]
            },
            { fields: ["user_id"] },
            { fields: ["vehicle_id"] }
        ]
    }
)

export default favorites;