import { GoogleLLMClient } from "./google-client";

export type LLMProvider = "google" | "openai";

export interface ILLMClient {
  invoke(prompt: string): Promise<unknown>;
}

export class LLMFactory {
  static create(provider: LLMProvider = "google"): ILLMClient {
    switch (provider) {
      case "google":
        return new GoogleLLMClient();
      case "openai":
        throw new Error("OpenAI client not implemented yet");
      default:
        throw new Error(`Unknown LLM provider: ${provider}`);
    }
  }
}
