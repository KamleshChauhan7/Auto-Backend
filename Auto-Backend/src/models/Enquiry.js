import { DataTypes, UUIDV4 } from "sequelize";
import seanebDB from "../config/db.js";

const Enquiry = seanebDB.define(
    "enquiry",
    {
        enquiry_id: {
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
            onDelete: "CASCADE",
            allowNull: false
        },
        car_id: {
            type: DataTypes.UUID,
            references: {
                model: "cars",
                key: "car_id"
            },
            onDelete: "CASCADE",
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Status: {
            type: DataTypes.STRING(20),
            validate: {
                isIn: [['NEW', 'RESPONDED', 'CLOSED']]
            },
            allowNull: false
        }

    },
    {
        tableName:"enquiry",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",

        paranoid: true
    }
)

export default Enquiry;