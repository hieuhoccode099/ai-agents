import { Logger } from "../../core/logger";
import { TransactionParserService } from "./services/parser.service";
import { TransactionRecorderService } from "./services/recorder.service";
export class TransactionAgent {
    parser;
    recorder;
    constructor() {
        this.parser = new TransactionParserService();
        this.recorder = new TransactionRecorderService();
    }
    async processInput(userInput) {
        Logger.info("Processing input:", userInput);
        const parseResult = await this.parser.extractTransactionInfo(userInput);
        if (!parseResult) {
            return {
                success: false,
                message: "Không thể phân tích thông tin giao dịch. Vui lòng thử lại với định dạng khác.",
            };
        }
        const recordResult = await this.recorder.recordTransaction(parseResult);
        if (!recordResult.success) {
            return {
                success: false,
                message: "Không thể ghi lại giao dịch.",
                error: recordResult.error,
            };
        }
        return {
            success: true,
            message: recordResult.message,
            transaction: parseResult,
        };
    }
}
//# sourceMappingURL=index.js.map