export interface ErrorResponse {
    success: false;
    message: string;
    error: string;
}
export declare const handleError: (error: unknown, defaultMessage: string) => ErrorResponse;
//# sourceMappingURL=error-handler.d.ts.map