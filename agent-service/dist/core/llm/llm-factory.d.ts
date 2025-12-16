export type LLMProvider = "google" | "openai";
export interface ILLMClient {
    invoke(prompt: string): Promise<unknown>;
}
export declare class LLMFactory {
    static create(provider?: LLMProvider): ILLMClient;
}
//# sourceMappingURL=llm-factory.d.ts.map