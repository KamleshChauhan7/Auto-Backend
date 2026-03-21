import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const User_Vehicle = seanebDB.define(
  "user_vehicle",
  {
    user_vehicle_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "vehicles",
        key: "vehicle_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "user_vehicle",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    paranoid: true,

    indexes: [
      { fields: ["user_id"] },
      { fields: ["vehicle_id"] },

      {
        unique: true,
        fields: ["user_id", "vehicle_id"], 
      },
    ],
  }
);

export default User_Vehicle;