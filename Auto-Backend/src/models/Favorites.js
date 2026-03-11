import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";


const favorites = seanebDB.define(
    "favorites",
    {
        favorites_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id"
            },
            onDelete:"CASCADE"
        },
        car_id:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model:"cars",
                key:"car_id"
            }
        }
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",

        paranoid: true
    }
)

export default favorites;