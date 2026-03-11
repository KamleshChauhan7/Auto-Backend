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
            ? { ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                }
            : {},
    }
);

export default seanebDB;