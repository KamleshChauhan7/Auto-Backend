// src/models/PaymentTransaction.js
import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const PaymentTransaction = seanebDB.define('PaymentTransaction', {
    order_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    branch_id: {
        type: DataTypes.UUID, 
        allowNull: false
    },
    
    // Determines WHAT they are buying
    order_type: {
        type: DataTypes.ENUM('CREDIT_PACK', 'DIRECT_POST'),
        allowNull: false,
        defaultValue: 'CREDIT_PACK'
    },
    
    // For why transaction is it purchasing credit or direct post payment (Plan ID, or Vehicle ID)
    reference_id: {
        type: DataTypes.UUID, 
        allowNull: true
    },
    
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    credit_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    validity_days: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    // Now uses descriptive ENUM strings
    payment_status: {
        type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED'),
        defaultValue: 'PENDING',
        allowNull: false
    },
    
    payment_session_id: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Cashfree Data 
    cf_payment_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    payment_method: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    bank_reference: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    paid_at: {
        type: DataTypes.DATE, 
        allowNull: true
    },
    failure_reason: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'payment_transactions',
    timestamps: true
});

export default PaymentTransaction;