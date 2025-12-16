import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../config/env";
import { DEFAULT_TEMPERATURE } from "../config/constants";

type Invokable = { invoke: (input: string) => Promise<unknown> };

export class GoogleLLMClient {
  private llm: Invokable;

  constructor() {
    const client = new ChatGoogleGenerativeAI({
      model: config.geminiModel,
      temperature: DEFAULT_TEMPERATURE,
      apiKey: config.geminiApiKey,
    });
    this.llm = client as unknown as Invokable;
  }

  invoke(prompt: string): Promise<unknown> {
    return this.llm.invoke(prompt);
  }

  getInstance(): Invokable {
    return this.llm;
  }
}
