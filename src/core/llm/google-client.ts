import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../config/env";
import { DEFAULT_TEMPERATURE } from "../config/constants";

export class GoogleLLMClient {
  private llm: ChatGoogleGenerativeAI;

  constructor() {
    this.llm = new ChatGoogleGenerativeAI({
      model: config.geminiModel,
      temperature: DEFAULT_TEMPERATURE,
      apiKey: config.geminiApiKey,
    });
  }

  invoke(prompt: string): Promise<unknown> {
    return this.llm.invoke(prompt);
  }

  getInstance(): ChatGoogleGenerativeAI {
    return this.llm;
  }
}
