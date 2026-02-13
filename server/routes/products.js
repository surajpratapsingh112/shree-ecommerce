import express from 'express';
import {
  getProducts,
  getProduct,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProductImage,
  deleteProduct,
  getFeaturedProducts,
  getRelatedProducts,
  addReview,
  updateReview,
  deleteReview,
  updateStock
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadMultiple, handleUploadError } from '../middleware/upload.js';
import {
  productValidation,
  mongoIdValidation,
  paginationValidation
} from '../middleware/validator.js';

const router = express.Router();

// Public routes
router.get('/', paginationValidation, getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', mongoIdValidation, getProduct);
router.get('/:id/related', mongoIdValidation, getRelatedProducts);

// Protected routes - Reviews
router.post(
  '/:id/reviews',
  protect,
  mongoIdValidation,
  uploadMultiple,
  handleUploadError,
  addReview
);
router.put(
  '/:id/reviews/:reviewId',
  protect,
  updateReview
);
router.delete(
  '/:id/reviews/:reviewId',
  protect,
  deleteReview
);

// Admin routes
router.post(
  '/',
  protect,
  authorize('admin'),
  uploadMultiple,
  handleUploadError,
  productValidation,
  createProduct
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  mongoIdValidation,
  uploadMultiple,
  handleUploadError,
  updateProduct
);

router.delete(
  '/:id/images/:imageId',
  protect,
  authorize('admin'),
  deleteProductImage
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  mongoIdValidation,
  deleteProduct
);

router.patch(
  '/:id/stock',
  protect,
  authorize('admin'),
  mongoIdValidation,
  updateStock
);

export default router;