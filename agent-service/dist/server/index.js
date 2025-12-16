import express from "express";
import { config, validateConfig } from "../core/config/env.js";
import transactionRoutes from "./routes/transaction.route.js";
const app = express();
app.use(express.json());
app.use(transactionRoutes);
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
export const startServer = () => {
    try {
        validateConfig();
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
            console.log(`Health check: http://localhost:${config.port}/health`);
            console.log(`Chat endpoint: http://localhost:${config.port}/api/chat`);
            console.log(`MCP endpoint: http://localhost:${config.port}/api/record-transaction`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
//# sourceMappingURL=index.js.map