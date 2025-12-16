import express from "express";
import { TransactionController } from "../controllers/transaction.controller";

const router = express.Router();
const controller = new TransactionController();

router.use(express.json());

router.post("/api/chat", controller.processChat.bind(controller));
router.post(
  "/api/record-transaction",
  controller.recordTransaction.bind(controller)
);

export default router;
