import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const UserVehicleDealer = seanebDB.define(
  "user_vehicle_dealer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_vehicle_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user_vehicle",
        key: "user_vehicle_id",
      },
      onDelete: "CASCADE",
    },
    branch_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "branches", 
        key: "branch_id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("SENT", "VIEWED", "ACCEPTED", "REJECTED"),
      defaultValue: "SENT",
      allowNull: false,
    },
  },
  {
    tableName: "user_vehicle_dealer",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    paranoid: true,

    indexes: [
      { fields: ["user_vehicle_id"] },
      { fields: ["branch_id"] },
      { fields: ["status"] },

      {
        unique: true,
        fields: ["user_vehicle_id", "branch_id"], // prevent duplicate dealer mapping
      },
    ],
  }
);

export default UserVehicleDealer;