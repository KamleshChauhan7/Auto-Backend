import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Invoice = seanebDB.define(
    "invoice",
    {
        invoice_id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        car_id:{
            type:DataTypes.UUID,    
            references:{
                model:"cars",
                key:"car_id"
            },
            onDelete:"CASCADE",
            allowNull:false
        },
        opted_plan_id:{
            type:DataTypes.UUID,
            references:{
                model:"opted_plan",
                key:"opted_plan_id"
            },
            onDelete:"CASCADE",
            allowNull:false
        },
        invoice_number:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true
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
        amount:{ //Car Amount
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
        },
        invoice_date:{
            type:DataTypes.DATE,
            allowNull:false
        }

    },
    {
        tableName:"invoice",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
        paranoid:true
    }
);


export default Invoice;