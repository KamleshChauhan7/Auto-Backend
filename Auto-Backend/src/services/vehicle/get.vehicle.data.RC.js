import axios from "axios";
import crypto from "crypto";

const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;

// Clean and exact Public Key from Cashfree docs
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvTYkMAtDqU2l3DbPf57u
rWUsUY7wKTyGtmuzhdbkyjzxzMowOwBRk4DdP0PqVFLdSIqJW4vKWLZXWhEjOM0A
7ct5yYCvQnw3eYIYXqCN9k0tlphabrnpd8F0lfsbg2eaONqSbgNd/LJm8+LnIxli
9O2k9xf4FCBhdZWxdrJQSKZWxv9K6j5zOBaEsZ2gcUohcwy2Pk7NjkAW4desoRwI
6/yCLz2FgOliL/OMVGLexDaheZcXHzKQDr72KiNjTQx1Sy0ZZGa2t1YwQOB1IQtu
b5rKsE/gPr+iQaUcjQ+UKfL5naY3QkQFSgtN3QRo4/tvRcw86yoBm6kW22p9BgSB
BQIDAQAB
-----END PUBLIC KEY-----`;

const generateSignature = () => {
    try {
        const timestamp = Math.floor(Date.now() / 1000);
        const data = `${CASHFREE_CLIENT_ID}.${timestamp}`;

        // Node 17+ with OpenSSL 3 is strict about formatting
        return crypto.publicEncrypt(
            {
                key: PUBLIC_KEY,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha1", 
            },
            Buffer.from(data)
        ).toString("base64");
    } catch (err) {
        console.error("Encryption Failed (Check Public Key Format):", err.message);
        throw new Error("INTERNAL_ENCRYPTION_ERROR");
    }
};

export const fetchRCDetailsFromCashfree = async (vehicleNumber) => {
    try {
        const signature = generateSignature();
        const verification_id = `rc_${Date.now()}`;

        // Use 'api' for Prod or 'sandbox' for testing
        const BASE_URL = process.env.NODE_ENV === "production" 
            ? "https://api.cashfree.com/verification" 
            : "https://sandbox.cashfree.com/verification";

        const response = await axios.post(
            `${BASE_URL}/vehicle-rc`,
            { 
                vehicle_number: vehicleNumber, 
                verification_id 
            },
            {
                timeout: 15000,
                headers: {
                    "Content-Type": "application/json",
                    "x-client-id": CASHFREE_CLIENT_ID,
                    "x-client-secret": CASHFREE_CLIENT_SECRET,
                    "x-cf-signature": signature, // Required for RSA-auth enabled accounts
                },
            }
        );

        return { success: true, data: response.data };

    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: error.message }
        };
    }
};