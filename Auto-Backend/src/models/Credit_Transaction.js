import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

// This model saves the all transaction of credits 

const Credit_Transaction = seanebDB.define(
    "credit_transactions",
    {

        transaction_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        branch_id: {
            type: DataTypes.UUID,
            allowNull: false
        },

        vehicle_id: {
            type: DataTypes.UUID,
            allowNull: true
        }, // Null if it's a Top-Up purchase

        type: {
            type: DataTypes.ENUM("TOPUP", "DEBIT_POST", "RENEWAL_POST"),
            allowNull: false
        },

        credits: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        
        amount_paid: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        }, 

        remarks: {
            type: DataTypes.STRING(255)
        }

    },
    {
        tableName: "credit_transactions",
        timestamps: true
    });

export default Credit_Transaction;