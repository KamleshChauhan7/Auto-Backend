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

    rc_master_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "rc_vehicle_masters",
            key: "vehicle_id"
        },
        onDelete: "RESTRICT" // Prevent deleting RC data if a listing exists
    },

    category_id: {
        type: DataTypes.UUID,
        allowNull: false
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

    listing_status: {
        type: DataTypes.ENUM("DRAFT", "ACTIVE", "EXPIRED", "SOLD", "DEACTIVATED"),
        defaultValue: "DRAFT"
    },

    published_at: {
        type: DataTypes.DATE,
        allowNull: true
    },

    expiry_date: {
        type: DataTypes.DATE,
        allowNull: true
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
            { fields: ["category_id"] },

            // Search Performance (New Columns)
            { fields: ["price"] },

            // Date sorting
            { fields: ["created_at"] },

            // Advanced filters for the Dealer Dashboard
            { fields: ["branch_id", "category_id"] },
            { fields: ["category_id", "price"] },

            { fields: ["rc_master_id"] }, // Index for fast joins
            { fields: ["listing_status"] }
        ]

    });

export default Vehicle;