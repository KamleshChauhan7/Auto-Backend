import { PaymentTransaction } from "../../../models/index.js";

export const getOrderStatus = async (req, res) => {
    try {
        const { order_id } = req.body;

        const order = await PaymentTransaction.findOne({
            where: { order_id: req.body.order_id },
            attributes: ["payment_status", "total_amount", "credit_count"]
        });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({
            success: true,
            data: {
                order_id,
                payment_status: order.payment_status, // 0=Pending, 1=Success, 2=Failed
                credits: order.credit_count
            }
        });
    } catch (error) {
        console.error("Error fetching order status:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};