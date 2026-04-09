import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Invoice = seanebDB.define(
    "invoice",
    {
        invoice_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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
        branch_id: {
            type: DataTypes.UUID,
            references: {
                model: "branches",
                key: "branch_id"
            },
            allowNull: false,
        },
        opted_plan_id: {
            type: DataTypes.UUID,
            references: {
                model: "opted_plan",
                key: "opted_plan_id"
            },
            onDelete: "CASCADE",
            allowNull: false
        },
        invoice_number: {
            type: DataTypes.STRING,
            allowNull: false
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
        amount: { // Car Amount
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        invoice_date: {
            type: DataTypes.DATE,
            allowNull: false
        }

    },
    {
        tableName: "invoice",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        indexes: [
            { fields: ["vehicle_id"] },
            { fields: ["user_id"] },
            { fields: ["invoice_date"] },
            {
                unique: true,
                fields: ["invoice_number", "branch_id"]
            }
        ]
    }
);


export default Invoice;