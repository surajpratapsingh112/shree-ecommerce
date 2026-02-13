import express from 'express';
import {
  getCategories,
  getCategory,
  getCategoryBySlug,
  getCategoryProducts,
  createCategory,
  updateCategory,
  deleteCategory,
  getParentCategories,
  getCategoryTree
} from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.js';
import {
  categoryValidation,
  mongoIdValidation
} from '../middleware/validator.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/parents', getParentCategories);
router.get('/tree', getCategoryTree);
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', mongoIdValidation, getCategory);
router.get('/:id/products', mongoIdValidation, getCategoryProducts);

// Admin routes
router.post(
  '/',
  protect,
  authorize('admin'),
  uploadSingle,
  handleUploadError,
  categoryValidation,
  createCategory
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  mongoIdValidation,
  uploadSingle,
  handleUploadError,
  updateCategory
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  mongoIdValidation,
  deleteCategory
);

export default router;