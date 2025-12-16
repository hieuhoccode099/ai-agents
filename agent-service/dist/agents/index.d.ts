import { TransactionAgent } from "./transaction/index.js";
export declare class AgentRegistry {
    private static agents;
    static getTransactionAgent(): TransactionAgent;
    static getAllAgents(): Record<string, unknown>;
}
//# sourceMappingURL=index.d.ts.map