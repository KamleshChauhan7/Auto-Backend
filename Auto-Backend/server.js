import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import "./src/models/index.js";
import seanebDB from './src/config/db.js';

import { swaggerUi, swaggerSpec } from "./src/config/swagger.js";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 8001;

const startServer = async () => {
    try {

        await seanebDB.authenticate();

        if (process.env.NODE_ENV !== "production") {
            await seanebDB.sync({ alter: true });
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Swagger available on http://localhost:${PORT}/api-docs`);
        });

    } catch (error) {

        console.log("Unable to start server",error);


    }
}

startServer();


