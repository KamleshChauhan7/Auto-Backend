import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Vehicle_Images = seanebDB.define(
    "vehicle_images",
    {
        image_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        vehicle_id: {
            type: DataTypes.UUID,
            references: {
                model: "vehicles",
                key: "vehicle_id"
            },
            onDelete: "CASCADE",
            allowNull: false
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 200,
        },

        width: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 200,
        },
    },
    {
        tableName: "vehicle_images",
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        indexes: [
            { fields: ["vehicle_id"] },
            { fields: ["created_at"] }
        ]
    }
)


export default Vehicle_Images;