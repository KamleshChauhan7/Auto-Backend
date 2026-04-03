import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const seanebDB = new Sequelize(
    process.env.DB_URI,
    {
        dialect: "postgres",

        logging: false,
        dialectOptions: isProduction
            ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            }
            : {},
        pool: {
            max: 20,           // Increase maximum connections
            min: 0,            // Minimum connections
            acquire: 60000,    // Time (ms) to wait for a connection before throwing error
            idle: 10000        // Time (ms) a connection can be idle before being released
        }
    }
);

export default seanebDB;