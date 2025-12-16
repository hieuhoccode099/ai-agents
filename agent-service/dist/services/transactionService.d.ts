declare const _default: TransactionService;
export default _default;
declare class TransactionService {
    apiUrl: string | undefined;
    apiToken: string | undefined;
    validateConfig(): void;
    createOrder(orderData: any): Promise<{
        success: boolean;
        data: any;
        status: number;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        status: any;
        data?: undefined;
    }>;
}
//# sourceMappingURL=transactionService.d.ts.map