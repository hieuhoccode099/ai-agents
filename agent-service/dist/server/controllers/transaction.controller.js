import { Logger } from "../../core/logger.js";
import { AgentRegistry } from "../../agents/index.js";
import transactionService from "../../services/transactionService.js";
export class TransactionController {
    async processChat(req, res) {
        try {
            Logger.info("Received chat request");
            const { message } = req.body;
            if (!message) {
                res.status(400).json({
                    success: false,
                    error: "Message is required",
                });
                return;
            }
            const agent = AgentRegistry.getTransactionAgent();
            const result = await agent.processInput(message);
            res.json(result);
        }
        catch (error) {
            Logger.error("Error processing chat:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error",
                message: error instanceof Error ? error.message : String(error),
            });
        }
    }
    async recordTransaction(req, res) {
        try {
            const { amount, quantity, products } = req.body;
            if (!amount || !quantity || !products || !Array.isArray(products)) {
                res.status(400).json({
                    success: false,
                    error: "Invalid request body. Missing required fields: amount, quantity, or products",
                });
                return;
            }
            if (products.length === 0) {
                res.status(400).json({
                    success: false,
                    error: "Products array cannot be empty",
                });
                return;
            }
            const orderData = {
                amount: Number(amount),
                quantity: Number(quantity),
                products: products.map((p) => ({ name: p.name })),
            };
            const result = await transactionService.createOrder(orderData);
            if (result.status === 201) {
                const productNames = products.map((p) => p.name).join(", ");
                res.json({
                    status: "success",
                    message: `Đã ghi lại đơn hàng ${productNames} ${amount}k.`,
                    data: result.data,
                });
            }
            else {
                res.status(result.status || 500).json({
                    status: "error",
                    message: "Không thể ghi đơn hàng",
                    error: result.error,
                });
            }
        }
        catch (error) {
            Logger.error("Error in record-transaction:", error);
            res.status(500).json({
                status: "error",
                message: "Lỗi server khi xử lý đơn hàng",
                error: error instanceof Error ? error.message : String(error),
            });
        }
    }
}
//# sourceMappingURL=transaction.controller.js.map