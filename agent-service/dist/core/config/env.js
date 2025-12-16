import dotenv from "dotenv";
dotenv.config();
export const config = {
    port: Number(process.env.PORT) || 3000,
    geminiApiKey: process.env.GEMINI_API_KEY || "",
    mcpServerUrl: process.env.MCP_SERVER_URL || "http://localhost:3000",
    transactionApiUrl: process.env.TRANSACTION_API_URL || "",
    transactionApiToken: process.env.TRANSACTION_API_TOKEN || "",
    geminiModel: process.env.GEMINI_MODEL || "gemini-2.0-flash-exp",
};
export const validateConfig = () => {
    if (!config.geminiApiKey) {
        throw new Error("GEMINI_API_KEY is required");
    }
};
//# sourceMappingURL=env.js.map