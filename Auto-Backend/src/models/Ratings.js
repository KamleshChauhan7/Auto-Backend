import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";

const Ratings = seanebDB.define(
    "ratings",
    {
        rating_id: {
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
            allowNull: false,
            onDelete: "CASCADE"
        },
        branch_id: {
            type: DataTypes.UUID,
            references: {
                model: "branches",
                key: "branch_id"
            },
            allowNull: false,
            onDelete: "CASCADE"
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
        }

    },
    {
        tableName: "ratings",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ["user_id", "branch_id"]
            },
            { fields: ["user_id"] },
            { fields: ["branch_id"] },
            { fields: ["rating"] }
        ]
    }
)

export default Ratings