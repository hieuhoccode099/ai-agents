import express from "express";
import dotenv from "dotenv";
import mcpRouter from "./mcp/server.js";
import TransactionAgent from "./agents/transactionAgent.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(mcpRouter);

const agent = new TransactionAgent();

app.post("/api/chat", async (req, res) => {
  try {
    console.log("Received chat request");
    const { message } = req.body;
    console.log("Message:", message);

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    const result = await agent.processInput(message);

    res.json(result);
  } catch (error) {
    console.error("Error processing chat:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`MCP endpoint: http://localhost:${PORT}/api/record-transaction`);
});
