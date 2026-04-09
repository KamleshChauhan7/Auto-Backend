import axios from "axios";
import crypto from "crypto";
import { ApiError } from "../../errors/ApiError.js";
import { ERROR_CODES } from "../../errors/errorCodes.js";

export const createCashfreeOrder = async ({
    order_id,
    order_amount,
    customer_id,
    customer_phone,
    customer_name,
}) => {
    try {
        const baseURL = process.env.NODE_ENV === "production"
            ? "https://api.cashfree.com"
            : "https://sandbox.cashfree.com";

        const response = await axios.post(
            `${baseURL}/pg/orders`,
            {
                order_id,
                order_amount,
                order_currency: "INR",
                customer_details: {
                    customer_id: customer_id || "CUST_DEFAULT",
                    customer_phone,
                    customer_name: customer_name || "Dealer",
                },
                order_meta: {
                    notify_url: "https://antoinette-loricate-unperpendicularly.ngrok-free.dev/api/v1/auto/webhook/cashfree"
                }
            },
            {
                headers: {
                    "x-client-id": process.env.CASHFREE_APP_ID,
                    "x-client-secret": process.env.CASHFREE_SECRET_KEY,
                    "x-api-version": "2023-08-01",
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("CASHFREE ERROR RESPONSE:", error.response?.data);
        throw new ApiError(ERROR_CODES.PAYMENT_GATEWAY_ERROR, error.response?.data?.message || "Cashfree error");
    }
};

export const verifyCashfreeSignature = (rawBody, signature, timestamp) => {
    try {
        if (!signature || !timestamp) return false;
        const secret = process.env.CASHFREE_SECRET_KEY;
        if (!secret) return false;

        const bodyString = typeof rawBody === "string" ? rawBody : rawBody.toString("utf8");
        const dataToVerify = timestamp + bodyString;

        const generatedBase64 = crypto.createHmac("sha256", secret).update(dataToVerify).digest("base64");
        const generatedHex = crypto.createHmac("sha256", secret).update(dataToVerify).digest("hex");

        return signature === generatedBase64 || signature === generatedHex;
    } catch (error) {
        return false;
    }
};