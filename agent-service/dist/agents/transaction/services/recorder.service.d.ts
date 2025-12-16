import { TransactionInfo } from "../types";
export interface RecordTransactionResult {
    success: boolean;
    message?: string;
    error?: string;
    status?: number;
}
export declare class TransactionRecorderService {
    recordTransaction(transactionData: TransactionInfo): Promise<RecordTransactionResult>;
    private handleAxiosError;
}
//# sourceMappingURL=recorder.service.d.ts.map