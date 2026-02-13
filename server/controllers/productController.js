import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { uploadImage, deleteImage, deleteMultipleImages } from '../config/cloudinary.js';
import { getPaginationData, generateSlug } from '../utils/helpers.js';

// @desc    Get All Products (with filters, search, pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      category,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      order = 'desc',
      featured
    } = req.query;

    // Build query
    const query = { isActive: true };

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Featured filter
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Count total documents
    const total = await Product.countDocuments(query);

    // Pagination
    const pagination = getPaginationData(page, limit, total);

    // Sort
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    // Execute query
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOptions)
      .skip(pagination.skip)
      .limit(pagination.itemsPerPage)
      .select('-reviews'); // Exclude reviews for performance

    res.status(200).json({
      success: true,
      count: products.length,
      pagination,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('reviews.user', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment views
    product.views += 1;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Product by Slug
// @route   GET /api/products/slug/:slug
// @access  Public
export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true })
      .populate('category', 'name slug')
      .populate('reviews.user', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment views
    product.views += 1;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Product (Admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      mrp,
      discount,
      category,
      stock,
      unit,
      specifications,
      features,
      isFeatured,
      sku,
      tags
    } = req.body;

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Handle image uploads
    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadImage(file.buffer, 'products');
        images.push({
          public_id: result.public_id,
          url: result.url
        });
      }
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      mrp,
      discount,
      category,
      images,
      stock,
      unit,
      specifications,
      features,
      isFeatured,
      sku,
      tags
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const newImages = [];
      for (const file of req.files) {
        const result = await uploadImage(file.buffer, 'products');
        newImages.push({
          public_id: result.public_id,
          url: result.url
        });
      }
      // Append new images to existing ones
      req.body.images = [...product.images, ...newImages];
    }

    // Update product
    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('category', 'name slug');

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Product Image (Admin)
// @route   DELETE /api/products/:id/images/:imageId
// @access  Private/Admin
export const deleteProductImage = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const image = product.images.id(imageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Delete from Cloudinary
    await deleteImage(image.public_id);

    // Remove from product
    image.deleteOne();
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
      images: product.images
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete all images from Cloudinary
    if (product.images && product.images.length > 0) {
      const publicIds = product.images.map(img => img.public_id);
      await deleteMultipleImages(publicIds);
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Featured Products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;

    const products = await Product.find({ isFeatured: true, isActive: true })
      .populate('category', 'name slug')
      .limit(parseInt(limit))
      .select('-reviews')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Related Products
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true
    })
      .limit(6)
      .select('-reviews')
      .sort('-ratings.average');

    res.status(200).json({
      success: true,
      count: relatedProducts.length,
      products: relatedProducts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add Product Review
// @route   POST /api/products/:id/reviews
// @access  Private
export const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    // Handle review images if uploaded
    let reviewImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadImage(file.buffer, 'reviews');
        reviewImages.push({
          public_id: result.public_id,
          url: result.url
        });
      }
    }

    // Add review
    product.reviews.push({
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
      images: reviewImages
    });

    // Calculate average rating
    product.calculateAverageRating();

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      reviews: product.reviews,
      ratings: product.ratings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Product Review
// @route   PUT /api/products/:id/reviews/:reviewId
// @access  Private
export const updateReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const review = product.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user owns this review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }

    if (rating) review.rating = Number(rating);
    if (comment) review.comment = comment;

    // Calculate average rating
    product.calculateAverageRating();

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      reviews: product.reviews,
      ratings: product.ratings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Product Review
// @route   DELETE /api/products/:id/reviews/:reviewId
// @access  Private
export const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const review = product.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user owns this review or is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    // Delete review images from Cloudinary
    if (review.images && review.images.length > 0) {
      const publicIds = review.images.map(img => img.public_id);
      await deleteMultipleImages(publicIds);
    }

    review.deleteOne();

    // Calculate average rating
    product.calculateAverageRating();

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
      reviews: product.reviews,
      ratings: product.ratings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Product Stock (Admin)
// @route   PATCH /api/products/:id/stock
// @access  Private/Admin
export const updateStock = async (req, res, next) => {
  try {
    const { stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock: Number(stock) },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      stock: product.stock
    });
  } catch (error) {
    next(error);
  }
};

export default {
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
};