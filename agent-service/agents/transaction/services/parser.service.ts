import { LLMFactory } from "../../../core/llm/llm-factory";
import { Logger } from "../../../core/logger";
import {
  extractTextFromContent,
  parseJsonSafely,
} from "../../../utils/json-utils";
import { validateTransactionData } from "../schemas/transaction.schema";
import { buildTransactionPrompt } from "../prompts/extract-transaction.prompt";
import { TransactionInfo } from "../types";

export class TransactionParserService {
  private llm = LLMFactory.create();

  async extractTransactionInfo(userInput: string): Promise<TransactionInfo> {
    const prompt = buildTransactionPrompt(userInput);
    const response = await this.llm.invoke(prompt);

    return this.parseResponse(response);
  }

  private async parseResponse(response: unknown): Promise<TransactionInfo> {
    try {
      const content = extractTextFromContent(response);
      Logger.debug("Raw LLM response content:", content);

      const parsedData = parseJsonSafely<TransactionInfo>(content);
      Logger.debug("Parsed data:", parsedData);

      const validatedData = validateTransactionData(parsedData);
      Logger.debug("Validated data:", validatedData);

      return validatedData;
    } catch (error) {
      Logger.error("Error parsing transaction response:", error);
      throw error;
    }
  }
}
