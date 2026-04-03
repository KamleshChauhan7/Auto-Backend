import {  DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Role_Permissions = seanebDB.define(
    "role_permissions",
    {
        role_permission_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        role_id: {
            type: DataTypes.UUID,
            references: {
                model: "roles",
                key: "role_id"
            },
            allowNull: false,
            onDelete: "CASCADE"
        },
        permission_id: {
            type: DataTypes.UUID,
            references: {
                model: "permissions",
                key: "permission_id"
            },
            allowNull: false,
            onDelete: "CASCADE"
        }
    },
    {
        tableName: "role_permissions",
        timestamps: true,
        paranoid: true,
        indexes: [
            { fields: ["role_id"] },
            { fields: ["permission_id"] },
            {
                unique: true,
                fields: ["role_id", "permission_id"]
            }
        ]
    }
);

export default Role_Permissions;