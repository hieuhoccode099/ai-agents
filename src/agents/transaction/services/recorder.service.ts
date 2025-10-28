import axios, { AxiosError } from "axios";
import { Logger } from "../../../core/logger";
import { config } from "../../../core/config/env";
import { DEFAULT_QUANTITY, HTTP_TIMEOUT } from "../../../core/config/constants";
import { TransactionInfo, TransactionRecordRequest } from "../types";

export interface RecordTransactionResult {
  success: boolean;
  message?: string;
  error?: string;
  status?: number;
}

export class TransactionRecorderService {
  async recordTransaction(
    transactionData: TransactionInfo
  ): Promise<RecordTransactionResult> {
    try {
      const payload: TransactionRecordRequest = {
        amount: transactionData.amount,
        quantity: transactionData.quantity || DEFAULT_QUANTITY,
        products: [{ name: transactionData.product }],
      };

      const response = await axios.post(
        `${config.mcpServerUrl}/api/record-transaction`,
        payload,
        { timeout: HTTP_TIMEOUT }
      );

      return {
        success: true,
        message: response.data.message || "Transaction recorded successfully",
      };
    } catch (error) {
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

  private handleAxiosError(error: AxiosError): RecordTransactionResult {
    if (error.response) {
      return {
        success: false,
        error:
          (error.response.data as { message?: string })?.message ||
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
