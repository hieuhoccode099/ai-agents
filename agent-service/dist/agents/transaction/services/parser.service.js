import { LLMFactory } from "../../../core/llm/llm-factory";
import { Logger } from "../../../core/logger";
import { extractTextFromContent, parseJsonSafely, } from "../../../utils/json-utils";
import { validateTransactionData } from "../schemas/transaction.schema";
import { buildTransactionPrompt } from "../prompts/extract-transaction.prompt";
export class TransactionParserService {
    llm = LLMFactory.create();
    async extractTransactionInfo(userInput) {
        const prompt = buildTransactionPrompt(userInput);
        const response = await this.llm.invoke(prompt);
        return this.parseResponse(response);
    }
    async parseResponse(response) {
        try {
            const content = extractTextFromContent(response);
            Logger.debug("Raw LLM response content:", content);
            const parsedData = parseJsonSafely(content);
            Logger.debug("Parsed data:", parsedData);
            const validatedData = validateTransactionData(parsedData);
            Logger.debug("Validated data:", validatedData);
            return validatedData;
        }
        catch (error) {
            Logger.error("Error parsing transaction response:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=parser.service.js.map