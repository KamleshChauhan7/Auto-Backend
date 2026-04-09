import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Credit_Balance = seanebDB.define(
    "credit_balance",
    {
        balance_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        branch_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: "branches",
                key: "branch_id"
            }
        },

        available_credits: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },

    },
    {
        tableName: "credit_balance",
        timestamps: true
    });

export default Credit_Balance;