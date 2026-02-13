import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get User Cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate({
        path: 'items.product',
        select: 'name price mrp images stock isActive'
      });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Filter out inactive products or products that are out of stock
    cart.items = cart.items.filter(item => 
      item.product && 
      item.product.isActive && 
      item.product.stock > 0
    );

    // Save if items were filtered out
    if (cart.isModified('items')) {
      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add Item to Cart
// @route   POST /api/cart/items
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check if product exists and is active
    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or unavailable'
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Check if item already in cart
    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;
      
      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `Cannot add more. Only ${product.stock} items available`
        });
      }

      existingItem.quantity = newQuantity;
      existingItem.price = product.price;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    await cart.save();

    // Populate and return
    cart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'name price mrp images stock isActive'
    });

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      cart
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Cart Item Quantity
// @route   PUT /api/cart/items/:itemId
// @access  Private
export const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    // Check product stock
    const product = await Product.findById(item.product);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product no longer available'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }

    // Update quantity and price
    item.quantity = quantity;
    item.price = product.price;

    await cart.save();

    // Populate and return
    const updatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'name price mrp images stock isActive'
    });

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      cart: updatedCart
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove Item from Cart
// @route   DELETE /api/cart/items/:itemId
// @access  Private
export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    item.deleteOne();
    await cart.save();

    // Populate and return
    const updatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'name price mrp images stock isActive'
    });

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cart: updatedCart
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear Cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      cart
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Sync Cart (Guest to User)
// @route   POST /api/cart/sync
// @access  Private
export const syncCart = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cart items'
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Merge items
    for (const guestItem of items) {
      const product = await Product.findById(guestItem.productId);
      
      if (!product || !product.isActive || product.stock < guestItem.quantity) {
        continue; // Skip invalid items
      }

      const existingItem = cart.items.find(
        item => item.product.toString() === guestItem.productId
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + guestItem.quantity;
        if (product.stock >= newQuantity) {
          existingItem.quantity = newQuantity;
          existingItem.price = product.price;
        }
      } else {
        cart.items.push({
          product: guestItem.productId,
          quantity: guestItem.quantity,
          price: product.price
        });
      }
    }

    await cart.save();

    // Populate and return
    cart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'name price mrp images stock isActive'
    });

    res.status(200).json({
      success: true,
      message: 'Cart synced successfully',
      cart
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  syncCart
};