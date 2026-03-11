import express from 'express';
import cors from 'cors';
import { apiLogger } from "./src/utils/api.logger.js";

const app = express();


app.use(apiLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running!');
});


export default app; 