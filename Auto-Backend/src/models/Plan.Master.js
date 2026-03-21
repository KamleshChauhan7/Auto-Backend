import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";


const Plan_Master = seanebDB.define(
    "plan_master",
    {
        plan_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        plan_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        duration_days: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "plan_master",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at",
        indexes: [
            { fields: ["plan_name"] },
            { fields: ["is_active"] },
            { fields: ["price"] }
        ]
    }
);


export default Plan_Master