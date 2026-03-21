import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Notification = seanebDB.define(
    "notification",
    {
        notification_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
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
            },
            onDelete: "CASCADE"
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        notification_type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: "ENQUIRY_REPLY or PRICE_DROP or NEW_CAR or PLAN_EXPIRED"
        }
    },
    {
        tableName: "notification",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        indexes: [
            { fields: ["user_id"] },
            { fields: ["vehicle_id"] },
            { fields: ["notification_type"] },
            { fields: ["created_at"] }
        ]
    }
);

export default Notification