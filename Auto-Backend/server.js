import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import "./src/models/index.js";
import seanebDB from './src/config/db.js';



const PORT = process.env.PORT || 8001;

const startServer = async () => {
    try {

        await seanebDB.authenticate();

        if (process.env.NODE_ENV !== "production") {
            await seanebDB.sync({ force: true });
            // await seanebDB.sync();

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


