import { TransactionAgent } from "./transaction";

export class AgentRegistry {
  private static agents = {
    transaction: new TransactionAgent(),
  };

  static getTransactionAgent(): TransactionAgent {
    return this.agents.transaction;
  }

  static getAllAgents(): Record<string, unknown> {
    return this.agents;
  }
}
