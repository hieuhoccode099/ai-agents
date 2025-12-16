import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class TransactionService {
  constructor() {
    this.apiUrl = process.env.TRANSACTION_API_URL;
    this.apiToken = process.env.TRANSACTION_API_TOKEN;
  }

  validateConfig() {
    if (!this.apiUrl) {
      throw new Error("TRANSACTION_API_URL is not configured");
    }
    if (!this.apiToken) {
      throw new Error("TRANSACTION_API_TOKEN is not configured");
    }
  }

  async createOrder(orderData) {
    this.validateConfig();

    const payload = {
      amount: orderData.amount,
      quantity: orderData.quantity,
      products: orderData.products.map((product) => ({
        name: product.name,
      })),
    };

    console.log("Calling transaction API:", {
      url: this.apiUrl,
      payload: JSON.stringify(payload, null, 2),
    });

    // Mock response for testing when API is not configured
    if (!this.apiUrl || this.apiUrl.includes("your-api-url")) {
      console.log("Mock response: Transaction would be recorded");
      return {
        success: true,
        data: { id: "mock_" + Date.now(), status: "created" },
        status: 200,
      };
    }

    try {
      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("Transaction API response:", {
        status: response.status,
        data: response.data,
      });

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Transaction API error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response) {
        return {
          success: false,
          error: error.response.data || error.message,
          status: error.response.status,
        };
      }

      throw error;
    }
  }
}

export default new TransactionService();
