import express from 'express';
import {
  createOrder,
  verifyPayment,
  getMyOrders,
  getOrder,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderStats
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  orderValidation,
  mongoIdValidation,
  paginationValidation
} from '../middleware/validator.js';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// Protected routes - User
router.post(
  '/',
  protect,
  orderValidation,
  createOrder
);

router.post(
  '/:id/verify-payment',
  protect,
  mongoIdValidation,
  [
    body('razorpayPaymentId')
      .notEmpty().withMessage('Payment ID is required'),
    body('razorpaySignature')
      .notEmpty().withMessage('Payment signature is required'),
    validate
  ],
  verifyPayment
);

router.get(
  '/',
  protect,
  paginationValidation,
  getMyOrders
);

router.get(
  '/:id',
  protect,
  mongoIdValidation,
  getOrder
);

router.put(
  '/:id/cancel',
  protect,
  mongoIdValidation,
  cancelOrder
);

// Admin routes
router.get(
  '/admin/all',
  protect,
  authorize('admin'),
  paginationValidation,
  getAllOrders
);

router.get(
  '/admin/stats',
  protect,
  authorize('admin'),
  getOrderStats
);

router.put(
  '/:id/status',
  protect,
  authorize('admin'),
  mongoIdValidation,
  [
    body('orderStatus')
      .optional()
      .isIn(['pending', 'processing', 'packed', 'shipped', 'delivered', 'cancelled', 'returned'])
      .withMessage('Invalid order status'),
    validate
  ],
  updateOrderStatus
);

export default router;
