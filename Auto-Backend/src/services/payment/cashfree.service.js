import { Cashfree } from "cashfree-pg";

// Configure the Static object directly
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = process.env.CASHFREE_ENV

export const createOrder = async (orderId, amount, customerId, phone, name) => {
    try {
        const request = {
            order_amount: amount.toString(),
            order_currency: "INR",
            order_id: orderId.toString(),
            customer_details: {
                customer_id: customerId.toString(),
                customer_phone: phone,
                customer_name: name || "Dealer"
            },
            order_meta: {
                return_url: `http://localhost:3000/`
            }
        };

        // Use the STATIC call with the API version string
        // This is the most widely supported method in the SDK
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        return response.data;
    } catch (error) {
        console.error("Cashfree API Error:", error.response?.data || error.message);
        throw error;
    }
};