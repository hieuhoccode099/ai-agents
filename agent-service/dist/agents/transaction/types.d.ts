export interface TransactionInfo {
    amount: number;
    quantity: number;
    product: string;
}
export interface TransactionRecordRequest {
    amount: number;
    quantity: number;
    products: Array<{
        name: string;
    }>;
}
export interface TransactionResponse {
    success: boolean;
    message?: string;
    transaction?: TransactionInfo;
    error?: string;
}
//# sourceMappingURL=types.d.ts.map