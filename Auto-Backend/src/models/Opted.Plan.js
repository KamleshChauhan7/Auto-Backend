import { DataTypes } from "sequelize";
import seanebDB from "../config/db.js";


const Opted_Plan = seanebDB.define(

    "opted_plan",
    {
        opted_plan_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        plan_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "plan_master",
                key: "plan_id"
            },
            onDelete: "CASCADE"
        },
        vehicle_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "vehicles",
                key: "vehicle_id"
            },
            onDelete: "CASCADE"
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfterStartDate(value) {
                    if (this.start_date && value <= this.start_date) {
                        throw new Error("end date must be greater than start date");
                    }
                }
            }
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "ACTIVE",
            validate: {
                isIn: [["ACTIVE", "EXPIRED", "PENDING", "CANCELLED", "BLOCK"]]
            }
        },
        payment_reference: {
            type: DataTypes.STRING(100),
            allowNull: true
        }

    },
    {
        tableName: "opted_plan",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            { fields: ["vehicle_id"] },
            { fields: ["plan_id"] },
            { fields: ["status"] },
            { fields: ["start_date"] },
            { fields: ["end_date"] },
            { fields: ["vehicle_id", "status"] }
        ]
    }

)

export default Opted_Plan;