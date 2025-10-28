import { TransactionInfo } from "../types";

export const formatTransactionResponse = (
  transaction: TransactionInfo
): {
  id?: string;
  amount: number;
  quantity: number;
  product: string;
} => ({
  amount: transaction.amount,
  quantity: transaction.quantity,
  product: transaction.product,
});
