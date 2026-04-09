import { PlanMaster, PaymentTransaction } from "../../../models/index.js"; 
import { createCashfreeOrder } from "../../../vendors/cashfree/payment.vendor.js";
import { ApiError } from "../../../errors/ApiError.js";
import { ERROR_CODES } from "../../../errors/errorCodes.js";

export const purchaseCredit = async (req, res, next) => {
    try {
        const { plan_name, credit_count, phone, customer_name } = req.body;
        const branch_id = req.branch?.branch_id;

        if (!branch_id) throw new ApiError(ERROR_CODES.UNAUTHORIZED);
        if (!plan_name || !credit_count || !phone) throw new ApiError(ERROR_CODES.REQUIRED_FIELDS_MISSING);

        // Fetch Plan Details
        const formattedPlanName = plan_name.toLowerCase().trim();
        const plan = await PlanMaster.findOne({ 
            where: { plan_name: formattedPlanName, is_active: true } 
        });

        if (!plan) throw new ApiError(ERROR_CODES.PLAN_NOT_FOUND);

        // Calculate Total
        const totalAmount = parseFloat(plan.price) * parseInt(credit_count);
        const orderId = `ORD_${Date.now()}`;

        // Create Pending Order in  PaymentTransaction 
        const newOrder = await PaymentTransaction.create({
            order_id: orderId,
            branch_id,
            order_type: 'CREDIT_PACK',           // For why this transaction
            reference_id: plan.plan_id,          // Plan Id
            credit_count: parseInt(credit_count),
            validity_days: plan.duration_days,
            total_amount: totalAmount,
            payment_status: 'PENDING'            //Payment status
        });

        // Hit Cashfree API via Vendor
        const orderResponse = await createCashfreeOrder({
            order_id: orderId,
            order_amount: totalAmount,
            customer_id: branch_id.substring(0, 30), // Cashfree limits ID length
            customer_phone: phone,
            customer_name: customer_name
        });

        // Update the database with the session ID so the frontend can trigger the popup
        await newOrder.update({ payment_session_id: orderResponse.payment_session_id });

        return res.status(200).json({
            success: true,
            message: "Credit order created successfully",
            payment_session_id: orderResponse.payment_session_id,
            order_id: orderResponse.order_id,
            amount: totalAmount
        });

    } catch (error) {
        next(error);
    }
};