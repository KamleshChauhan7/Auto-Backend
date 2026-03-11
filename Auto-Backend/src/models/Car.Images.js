import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Car_Images = seanebDB.define(
    "car_images",
    {
        image_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
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
        image_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 200,
        },

        width: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 200,
        },
    },
    {
        tableName: "car_images",
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true
    }
)


export default Car_Images;