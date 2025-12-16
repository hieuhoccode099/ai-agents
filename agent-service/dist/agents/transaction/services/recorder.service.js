import axios from "axios";
import { Logger } from "../../../core/logger";
import { config } from "../../../core/config/env";
import { DEFAULT_QUANTITY, HTTP_TIMEOUT } from "../../../core/config/constants";
export class TransactionRecorderService {
    async recordTransaction(transactionData) {
        try {
            const payload = {
                amount: transactionData.amount,
                quantity: transactionData.quantity || DEFAULT_QUANTITY,
                products: [{ name: transactionData.product }],
            };
            const response = await axios.post(`${config.mcpServerUrl}/api/record-transaction`, payload, { timeout: HTTP_TIMEOUT });
            return {
                success: true,
                message: response.data.message || "Transaction recorded successfully",
            };
        }
        catch (error) {
            Logger.error("Error calling MCP Server:", error);
            if (axios.isAxiosError(error)) {
                return this.handleAxiosError(error);
            }
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }
    handleAxiosError(error) {
        if (error.response) {
            return {
                success: false,
                error: error.response.data?.message ||
                    error.message,
                status: error.response.status,
            };
        }
        return {
            success: false,
            error: error.message,
        };
    }
}
//# sourceMappingURL=recorder.service.js.map