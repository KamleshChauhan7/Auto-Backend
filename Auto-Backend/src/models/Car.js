import { DataTypes, STRING } from "sequelize";
import seanebDB from "../config/db.js";


const Car = seanebDB.define(
    "car",
    {
        car_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        branch_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "branches",
                key: "branch_id"
            }
        },
        model_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "car_models",
                key: "model_id"
            }
        },
        car_register_number: {
            type: DataTypes.STRING(15),
            unique: true,
            allowNull: false
        },
        owner_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1900,
            }
        },
        color: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fuel_type_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "car_fuel_type",
                key: "fuel_type_id"
            }
        },
        transmission: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        km_driven: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ownership_count: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        drive_type: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        mileage: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        horse_power: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        seater: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        insurance: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        puc: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",

        paranoid: true
    }

)


export default Car;