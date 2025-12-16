import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../config/env";
import { DEFAULT_TEMPERATURE } from "../config/constants";
export class GoogleLLMClient {
    llm;
    constructor() {
        const client = new ChatGoogleGenerativeAI({
            model: config.geminiModel,
            temperature: DEFAULT_TEMPERATURE,
            apiKey: config.geminiApiKey,
        });
        this.llm = client;
    }
    invoke(prompt) {
        return this.llm.invoke(prompt);
    }
    getInstance() {
        return this.llm;
    }
}
//# sourceMappingURL=google-client.js.map