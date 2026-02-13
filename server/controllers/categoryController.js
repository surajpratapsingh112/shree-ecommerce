import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';

// @desc    Get All Categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const { includeInactive = false } = req.query;

    const query = includeInactive === 'true' ? {} : { isActive: true };

    const categories = await Category.find(query)
      .populate('subcategories')
      .sort('displayOrder name');

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('subcategories')
      .populate('productsCount');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Category by Slug
// @route   GET /api/categories/slug/:slug
// @access  Public
export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug,
      isActive: true 
    })
      .populate('subcategories')
      .populate('productsCount');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Category Products
// @route   GET /api/categories/:id/products
// @access  Public
export const getCategoryProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, sortBy = 'createdAt', order = 'desc' } = req.query;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Get all subcategory IDs
    const subcategories = await Category.find({ parent: category._id });
    const categoryIds = [category._id, ...subcategories.map(sub => sub._id)];

    // Count total products
    const total = await Product.countDocuments({
      category: { $in: categoryIds },
      isActive: true
    });

    // Pagination
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    // Sort
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    // Get products
    const products = await Product.find({
      category: { $in: categoryIds },
      isActive: true
    })
      .populate('category', 'name slug')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-reviews');

    res.status(200).json({
      success: true,
      count: products.length,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit)
      },
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Category (Admin)
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res, next) => {
  try {
    const { name, description, parent, isActive, displayOrder } = req.body;

    // Check if parent exists (if provided)
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: 'Parent category not found'
        });
      }
    }

    // Handle image upload
    let image = {};
    if (req.file) {
      const result = await uploadImage(req.file.buffer, 'categories');
      image = {
        public_id: result.public_id,
        url: result.url
      };
    }

    // Create category
    const category = await Category.create({
      name,
      description,
      parent,
      image,
      isActive,
      displayOrder
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Category (Admin)
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Handle new image upload
    if (req.file) {
      // Delete old image if exists
      if (category.image && category.image.public_id) {
        await deleteImage(category.image.public_id);
      }

      const result = await uploadImage(req.file.buffer, 'categories');
      req.body.image = {
        public_id: result.public_id,
        url: result.url
      };
    }

    // Update category
    category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('subcategories');

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Category (Admin)
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if category has products
    const productsCount = await Product.countDocuments({ category: category._id });
    if (productsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${productsCount} products. Please reassign or delete products first.`
      });
    }

    // Check if category has subcategories
    const subcategoriesCount = await Category.countDocuments({ parent: category._id });
    if (subcategoriesCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${subcategoriesCount} subcategories. Please delete subcategories first.`
      });
    }

    // Delete image from Cloudinary
    if (category.image && category.image.public_id) {
      await deleteImage(category.image.public_id);
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Parent Categories (Top Level)
// @route   GET /api/categories/parents
// @access  Public
export const getParentCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ 
      parent: null,
      isActive: true 
    })
      .populate('subcategories')
      .sort('displayOrder name');

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Category Tree (Hierarchical)
// @route   GET /api/categories/tree
// @access  Public
export const getCategoryTree = async (req, res, next) => {
  try {
    const buildTree = async (parentId = null) => {
      const categories = await Category.find({ 
        parent: parentId,
        isActive: true 
      }).sort('displayOrder name');

      const tree = [];
      for (const category of categories) {
        const subcategories = await buildTree(category._id);
        tree.push({
          _id: category._id,
          name: category.name,
          slug: category.slug,
          image: category.image,
          displayOrder: category.displayOrder,
          subcategories: subcategories.length > 0 ? subcategories : undefined
        });
      }
      return tree;
    };

    const categoryTree = await buildTree();

    res.status(200).json({
      success: true,
      categories: categoryTree
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getCategories,
  getCategory,
  getCategoryBySlug,
  getCategoryProducts,
  createCategory,
  updateCategory,
  deleteCategory,
  getParentCategories,
  getCategoryTree
};