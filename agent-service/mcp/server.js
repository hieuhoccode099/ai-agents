import express from 'express';
import transactionService from '../services/transactionService.js';

const router = express.Router();

router.use(express.json());

router.post('/api/record-transaction', async (req, res) => {
  try {
    const { amount, quantity, products } = req.body;

    if (!amount || !quantity || !products || !Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body. Missing required fields: amount, quantity, or products'
      });
    }

    if (products.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Products array cannot be empty'
      });
    }

    const orderData = {
      amount: Number(amount),
      quantity: Number(quantity),
      products: products.map(p => ({ name: p.name }))
    };

    const result = await transactionService.createOrder(orderData);
    if (result.status === 201) {
      const productNames = products.map(p => p.name).join(', ');
      return res.json({
        status: 'success',
        message: `Đã ghi lại đơn hàng ${productNames} ${amount}k.`,
        data: result.data
      });
    } else {
      return res.status(result.status || 500).json({
        status: 'error',
        message: 'Không thể ghi đơn hàng',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error in record-transaction:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server khi xử lý đơn hàng',
      error: error.message
    });
  }
});

export default router;

