import seanebDB from "../../../config/db.js";
import { PaymentTransaction, CreditBalance } from "../../../models/index.js"; 
import { verifyCashfreeSignature } from "../../../vendors/cashfree/payment.vendor.js";

export const cashfreeWebhook = async (req, res) => {
    console.log("--- WEBHOOK HIT MY SERVER ---");
    const transaction = await seanebDB.transaction();

    try {
        const signature = req.headers["x-webhook-signature"] || req.headers["x-cf-signature"];
        const timestamp = req.headers["x-webhook-timestamp"];
        const rawBody = req.rawBody;

        if (!rawBody || !signature || !timestamp) {
            console.error("REJECTED: Missing Headers");
            await transaction.rollback();
            return res.status(400).send("Missing signature");
        }

        if (!verifyCashfreeSignature(rawBody, signature, timestamp)) {
            console.error("REJECTED: Invalid Signature Check Failed!");
            await transaction.rollback();
            return res.status(400).send("Invalid signature");
        }

        console.log("SIGNATURE VERIFIED PERFECTLY!");

        const payload = req.body;
        const orderId = payload.data?.order?.order_id;
        const eventType = payload.type;

        if (!orderId) {
            console.error(" REJECTED: No Order ID in Payload");
            await transaction.rollback();
            return res.status(400).send("Invalid payload");
        }

        // Lock the row to prevent race conditions during concurrent webhooks
        const order = await PaymentTransaction.findOne({
            where: { order_id: orderId },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!order) {
            console.error(`REJECTED: Order ${orderId} not found in Database!`);
            await transaction.rollback();
            return res.status(404).send("Order not found");
        }

        if (eventType === "PAYMENT_SUCCESS_WEBHOOK") {
            // 'SUCCESS' instead of 1
            if (order.payment_status === 'SUCCESS') {
                console.log(" Order already processed as Success.");
                await transaction.rollback();
                return res.status(200).send("Already processed");
            }

            //  Update the PaymentTransaction with Cashfree's Audit Data
            await order.update({ 
                payment_status: 'SUCCESS',
                cf_payment_id: payload.data.payment?.cf_payment_id,
                payment_method: payload.data.payment?.payment_method?.card?.card_network || payload.data.payment?.payment_group,
                bank_reference: payload.data.payment?.bank_reference,
                paid_at: payload.data.payment?.payment_time
            }, { transaction });

            // Fork logic based on what the dealer bought
            if (order.order_type === 'CREDIT_PACK') {
                
                // Fetch or Create their Lifetime Balance
                const [balance] = await CreditBalance.findOrCreate({
                    where: { branch_id: order.branch_id },
                    defaults: { available_credits: 0 },
                    transaction
                });

                // Add the new credits to their existing balance
                await balance.update({
                    available_credits: balance.available_credits + order.credit_count
                }, { transaction });

                console.log(`SUCCESS! Added ${order.credit_count} lifetime credits to branch ${order.branch_id}`);

            } else if (order.order_type === 'DIRECT_POST') {
                
                // FUTURE LOGIC: They bypassed credits and paid directly for a vehicle post.
                // You will update the RcVehicleMaster table using order.reference_id here.
                console.log(` SUCCESS! Direct Payment Complete. Vehicle ${order.reference_id} is now Active!`);
                
            }

            await transaction.commit();
            return res.status(200).send("Webhook processed successfully");
        }

        if (eventType === "PAYMENT_FAILED_WEBHOOK") {
            // 'FAILED' instead of 2
            await order.update({
                payment_status: 'FAILED',
                failure_reason: payload.data?.payment?.payment_message || "Failed"
            }, { transaction });
            
            await transaction.commit();
            console.log(`PAYMENT FAILED: ${orderId}`);
            return res.status(200).send("Failure recorded");
        }

        await transaction.commit();
        console.log(`Ignored Event Type: ${eventType}`);
        return res.status(200).send("Event ignored");

    } catch (error) {
        if (!transaction.finished) await transaction.rollback();
        console.error(" Webhook Server Error:", error);
        return res.status(500).send("Internal server error");
    }
};