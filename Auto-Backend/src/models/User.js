// Area database schema
import DataTypes from "sequelize";
import seanebDB from "../config/db.js";

const User = seanebDB.define(
  "users",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    central_user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "ACTIVE",
      validate: {
        isIn: [["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED", "DELETED"]],
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;