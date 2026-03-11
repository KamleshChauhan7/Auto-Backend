import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Permissions = seanebDB.define(
    "permissions",
    {
        permission_id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        permission_key:{
            type:DataTypes.STRING(100),
            unique:true,
            allowNull:false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    },
    {
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
        paranoid:true
    }
)

export default Permissions;