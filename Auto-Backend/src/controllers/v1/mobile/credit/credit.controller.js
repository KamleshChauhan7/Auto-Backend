import { Cashfree } from "cashfree-pg"; 
import { createOrder } from "../../../../services/payment/cashfree.service.js";

import { PlanMaster, CreditTransaction, CreditBalance } from "../../../models/index.js";
import seanebDB from "../../../config/db.js";

export const purchaseCredit = async (req, res, next) => {
    try {
        const { credit_count, phone, customer_name } = req.body;
        const branch_id = req.branch?.branch_id;

        if (!branch_id) return res.status(401).json({ success: false, message: "Unauthorized" });

        const currentPlan = await PlanMaster.findOne({ where: { is_active: true } });
        const totalAmount = parseFloat(currentPlan.price) * parseInt(credit_count);

        const pendingTx = await CreditTransaction.create({
            branch_id,
            type: "TOPUP",
            credits: credit_count,
            amount_paid: totalAmount,
            remarks: "PENDING" 
        });

        const cashfreeData = await createOrder(
            pendingTx.transaction_id, 
            totalAmount, 
            branch_id, 
            phone,
            customer_name
        );

        return res.status(200).json({
            success: true,
            data: {
                payment_session_id: cashfreeData.payment_session_id,
                order_id: pendingTx.transaction_id
            }
        });
    } catch (error) {
        next(error);
    }
};

export const verifyPayment = async (req, res, next) => {
    const { order_id } = req.body;

    try {
     
        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", order_id);
        const payments = response.data || [];
        const successPayment = payments.find(p => p.payment_status === "SUCCESS");

        if (!successPayment) {
            return res.status(400).json({ success: false, message: "Payment not successful" });
        }

        const t = await seanebDB.transaction();
        try {
            const txRecord = await CreditTransaction.findByPk(order_id, { transaction: t });

            if (!txRecord || txRecord.remarks === "SUCCESS") {
                await t.rollback();
                return res.status(400).json({ success: false, message: "Already processed" });
            }

            const [balance] = await CreditBalance.findOrCreate({
                where: { branch_id: txRecord.branch_id },
                defaults: { available_credits: 0 },
                transaction: t
            });

            await balance.increment('available_credits', { by: txRecord.credits, transaction: t });
            await txRecord.update({ remarks: "SUCCESS" }, { transaction: t });

            await t.commit();
            res.status(200).json({ success: true, message: "Credits Added!" });
        } catch (err) {
            await t.rollback();
            throw err;
        }
    } catch (error) {
        next(error);
    }
};