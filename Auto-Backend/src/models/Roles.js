import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Roles = seanebDB.define(
    "roles",
    {
        role_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        role_key: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        role_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        tableName: "roles",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        indexes: [
            { unique: true, fields: ["role_key"] }
        ]
    }
)

export default Roles