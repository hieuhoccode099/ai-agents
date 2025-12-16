import { TransactionAgent } from "./transaction/index.js";
export class AgentRegistry {
    static agents = {
        transaction: new TransactionAgent(),
    };
    static getTransactionAgent() {
        return this.agents.transaction;
    }
    static getAllAgents() {
        return this.agents;
    }
}
//# sourceMappingURL=index.js.map