import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Vehicle_Permit = seanebDB.define("vehicle_permits", {
    permit_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    vehicle_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true, // One permit record per vehicle
        references: {
            model: "vehicles",
            key: "vehicle_id"
        },
        onDelete: "CASCADE"
    },
    // --- Standard Permit Details ---
    permit_number: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    permit_type: {
        type: DataTypes.STRING(50), // e.g., Goods Carriage, Stage Carriage
        allowNull: true
    },
    permit_issue_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    permit_valid_from: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    permit_valid_upto: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    // --- National Permit Details ---
    national_permit_number: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    national_permit_upto: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    national_permit_issued_by: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    // --- Status Flags ---
    non_use_status: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    is_commercial: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    noc_details: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "vehicle_permits",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true // Supports soft deletes
});

export default Vehicle_Permit;