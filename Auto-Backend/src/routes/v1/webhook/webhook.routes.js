import express from "express";
import { cashfreeWebhook } from "../../../controllers/v1/webhook/webhook.controller.js";

const router = express.Router();
router.post(
    "/cashfree",
    express.raw({ type: 'application/json' }), 
    (req, res, next) => {
        // If the body is a Buffer, our raw capture worked!
        if (Buffer.isBuffer(req.body)) {
            req.rawBody = req.body.toString('utf8');
            try {
                req.body = JSON.parse(req.rawBody);
                next();
            } catch (err) {
                return res.status(400).send("Invalid JSON");
            }
        } else {
            return res.status(500).send("Server config error");
        }
    },
    cashfreeWebhook
);

export default router;