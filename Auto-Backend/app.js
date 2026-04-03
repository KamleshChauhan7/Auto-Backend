import express from 'express';
import cors from 'cors';
import { apiLogger } from "./src/utils/api.logger.js";  
import { setupSwagger } from "./src/config/swagger.js";

import apiRouter from "./src/routes/v1/apiRoutes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

const app = express();

app.use(apiLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true); // Allows Express to see the real Client IP through headers like X-Forwarded-For

setupSwagger(app);
app.use("/api/v1/auto",apiRouter);

app.get('/', (req, res) => {
    res.send('Server is running!');
});


app.use(errorHandler);

export default app; 