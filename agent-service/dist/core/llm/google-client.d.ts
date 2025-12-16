type Invokable = {
    invoke: (input: string) => Promise<unknown>;
};
export declare class GoogleLLMClient {
    private llm;
    constructor();
    invoke(prompt: string): Promise<unknown>;
    getInstance(): Invokable;
}
export {};
//# sourceMappingURL=google-client.d.ts.map