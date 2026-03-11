import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const User_Roles = seanebDB.define(
    "user_roles",
    {
        user_roles_id: {
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
            allowNull: false,
            onDelete: "CASCADE"
        },
        branch_id: {
            type: DataTypes.UUID,
            references: {
                model: "branches",
                key: "branch_id"
            },
            allowNull: false,
            onDelete: "CASCADE"
        },
        role_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "roles",
                key: "role_id"
            },
            onDelete: "CASCADE"

        },
        product_id:{
            type:DataTypes.UUID,
            allowNull:false
        }
    },
    {
        tableName: "user_roles",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
        paranoid:true

    }
);

export default User_Roles;