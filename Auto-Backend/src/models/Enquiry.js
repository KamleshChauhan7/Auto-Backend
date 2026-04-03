import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Enquiry = seanebDB.define(
    "enquiry",
    {
        enquiry_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: "users",
                key: "user_id"
            },
            onDelete: "CASCADE",
            allowNull: false
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
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(20),
            defaultValue: "NEW",
            validate: {
                isIn: [['NEW', 'RESPONDED', 'CLOSED']]
            },
            allowNull: false
        }

    },
    {
        tableName: "enquiry",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        indexes: [
            { fields: ["user_id"] },
            { fields: ["vehicle_id"] },
            { fields: ["status"] },

            { fields: ["created_at"] },

            { fields: ["user_id", "vehicle_id"] }
        ]
    }
)

export default Enquiry;