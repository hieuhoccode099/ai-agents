import { GoogleLLMClient } from "./google-client";
export class LLMFactory {
    static create(provider = "google") {
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
//# sourceMappingURL=llm-factory.js.map