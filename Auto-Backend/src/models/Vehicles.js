import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Vehicle = seanebDB.define("vehicles", {

    vehicle_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    branch_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    brand_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    model_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    manufacturing_month_year: {
        type: DataTypes.DATE,
    },

    category_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    fuel_type_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    reg_no: {
        type: DataTypes.STRING(20),
        unique: true, allowNull: false
    },

    chassis_no: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },

    engine_no: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },

    owner_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }, // Official name from RC

    owner_father_name: {
        type: DataTypes.STRING(100),
    },

    owner_count: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

    rc_status: {
        type: DataTypes.STRING(20),
        defaultValue: "ACTIVE"
    }, // e.g., ACTIVE, SUSPENDED

    registration_date: {
        type: DataTypes.DATEONLY
    },

    rc_expiry_date:
    {
        type: DataTypes.DATEONLY
    },

    vehicle_manufacturer_name: {
        type: DataTypes.STRING(255)
    },

    reg_authority: {
        type: DataTypes.STRING(100)
    },

    body_type: {
        type: DataTypes.STRING(50)
    }, // e.g., HATCHBACK, SUV

    color: {
        type: DataTypes.STRING(30)
    },

    seat_capacity: {
        type: DataTypes.INTEGER
    },

    is_commercial: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    insurance_company: {
        type: DataTypes.STRING(100)
    },

    insurance_policy_no:
    {
        type: DataTypes.STRING(50)
    },

    insurance_expiry: {
        type: DataTypes.DATEONLY
    },

    pucc_no: {
        type: DataTypes.STRING(50)
    },

    pucc_expiry: {
        type: DataTypes.DATEONLY
    },

    financer: {
        type: DataTypes.STRING(100)
    },

    // MAnually entered by dealer
    price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },

    km_driven: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    transmission: {
        type: DataTypes.STRING(20)
    }, // Manual / Automatic

    description: {
        type: DataTypes.TEXT
    },

},
    {
        tableName: "vehicles",
        timestamps: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        
        indexes: [
            //  Primary Foreign Keys
            { fields: ["branch_id"] },
            { fields: ["brand_id"] },
            { fields: ["model_id"] },
            { fields: ["category_id"] },
            { fields: ["fuel_type_id"] },

            // Search Performance (New Columns)
            { fields: ["price"] },
            { fields: ["registration_date"] }, // Replaced 'year'
            { fields: ["rc_status"] },
            { fields: ["is_commercial"] },

            // Date sorting
            { fields: ["created_at"] },

            // Advanced filters for the Dealer Dashboard
            { fields: ["branch_id", "category_id"] },
            { fields: ["category_id", "price"] },
        ]
    
    });

export default Vehicle;