import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  syncCart
} from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// All cart routes require authentication
router.use(protect);

// Get user cart
router.get('/', getCart);

// Add item to cart
router.post(
  '/items',
  [
    body('productId')
      .notEmpty().withMessage('Product ID is required')
      .isMongoId().withMessage('Invalid product ID'),
    body('quantity')
      .optional()
      .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    validate
  ],
  addToCart
);

// Update cart item
router.put(
  '/items/:itemId',
  [
    param('itemId')
      .isMongoId().withMessage('Invalid item ID'),
    body('quantity')
      .notEmpty().withMessage('Quantity is required')
      .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    validate
  ],
  updateCartItem
);

// Remove item from cart
router.delete(
  '/items/:itemId',
  [
    param('itemId').isMongoId().withMessage('Invalid item ID'),
    validate
  ],
  removeFromCart
);

// Clear cart
router.delete('/', clearCart);

// Sync cart (guest to user)
router.post('/sync', syncCart);

export default router;