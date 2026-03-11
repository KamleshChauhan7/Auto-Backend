import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Notification = seanebDB.define(
    "notification",
    {
        notification_id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        user_id:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model:"users",
                key:"user_id"
            },
            onDelete:"CASCADE"
        },
        car_id:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model:"cars",
                key:"car_id"
            },
            onDelete:"CASCADE"
        },
        title:{
            type:DataTypes.STRING(150),
            allowNull:false
        },
        message:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        notification_type:{
            type:DataTypes.STRING(20),
            allowNull:false,
            comment:"ENQUIRY_REPLY or PRICE_DROP or NEW_CAR or PLAN_EXPIRED"
        }
    },
    {
        tableName:"notification",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
        paranoid:true
    }
);

export default Notification