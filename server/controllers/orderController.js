import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { 
  createRazorpayOrder, 
  verifyPaymentSignature,
  fetchPaymentDetails,
  createRefund 
} from '../config/razorpay.js';
import { 
  sendOrderConfirmationEmail, 
  sendOrderStatusEmail 
} from '../utils/emailService.js';
import { getPaginationData, calculateGST } from '../utils/helpers.js';

// @desc    Create New Order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const { 
      items, 
      shippingAddress, 
      paymentMethod 
    } = req.body;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in order'
      });
    }

    // Calculate order amounts
    let itemsPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product || !product.isActive) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.product} not found or unavailable`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Only ${product.stock} available.`
        });
      }

      const itemTotal = product.price * item.quantity;
      itemsPrice += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0]?.url || '',
        quantity: item.quantity,
        price: product.price
      });
    }

    // Calculate tax (18% GST)
    const gstCalculation = calculateGST(itemsPrice, 18);
    const taxPrice = gstCalculation.gstAmount;

    // Shipping price (free above ₹500, else ₹50)
    const shippingPrice = itemsPrice >= 500 ? 0 : 50;

    // Total price
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus: 'pending'
    });

    // If payment method is Razorpay, create Razorpay order
    if (paymentMethod === 'razorpay') {
      try {
        const razorpayOrder = await createRazorpayOrder(
          totalPrice,
          'INR',
          order.orderNumber
        );

        order.paymentDetails.razorpayOrderId = razorpayOrder.id;
        await order.save();

        res.status(201).json({
          success: true,
          message: 'Order created successfully',
          order,
          razorpayOrder: {
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID
          }
        });
      } catch (error) {
        // Delete order if Razorpay order creation fails
        await Order.findByIdAndDelete(order._id);
        
        return res.status(500).json({
          success: false,
          message: 'Failed to create payment order',
          error: error.message
        });
      }
    } else {
      // COD order - directly confirm
      order.paymentDetails.status = 'pending';
      order.orderStatus = 'processing';
      await order.save();

      // Update product stock
      await updateProductStock(orderItems);

      // Clear user's cart
      await Cart.findOneAndUpdate(
        { user: req.user.id },
        { items: [] }
      );

      // Send order confirmation email
      const user = await User.findById(req.user.id);
      sendOrderConfirmationEmail(order, user).catch(err => 
        console.error('Order confirmation email failed:', err.message)
      );

      res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        order
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Payment and Complete Order
// @route   POST /api/orders/:id/verify-payment
// @access  Private
export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpayPaymentId, razorpaySignature } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Verify user owns this order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    // Verify payment signature
    const isValidSignature = verifyPaymentSignature(
      order.paymentDetails.razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValidSignature) {
      order.paymentDetails.status = 'failed';
      await order.save();

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    // Fetch payment details from Razorpay
    const paymentDetails = await fetchPaymentDetails(razorpayPaymentId);

    // Update order
    order.paymentDetails.razorpayPaymentId = razorpayPaymentId;
    order.paymentDetails.razorpaySignature = razorpaySignature;
    order.paymentDetails.status = 'completed';
    order.paymentDetails.paidAt = Date.now();
    order.orderStatus = 'processing';

    await order.save();

    // Update product stock
    await updateProductStock(order.items);

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [] }
    );

    // Send order confirmation email
    const user = await User.findById(req.user.id);
    sendOrderConfirmationEmail(order, user).catch(err => 
      console.error('Order confirmation email failed:', err.message)
    );

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get User Orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const total = await Order.countDocuments({ user: req.user.id });
    const pagination = getPaginationData(page, limit, total);

    const orders = await Order.find({ user: req.user.id })
      .sort('-createdAt')
      .skip(pagination.skip)
      .limit(pagination.itemsPerPage);

    res.status(200).json({
      success: true,
      count: orders.length,
      pagination,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel Order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled
    if (!['pending', 'processing'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // Update order status
    order.orderStatus = 'cancelled';
    order.cancelledAt = Date.now();

    await order.save();

    // Restore product stock
    await restoreProductStock(order.items);

    // Process refund if payment was completed
    if (order.paymentDetails.status === 'completed') {
      try {
        await createRefund(order.paymentDetails.razorpayPaymentId);
        order.paymentDetails.status = 'refunded';
        await order.save();
      } catch (error) {
        console.error('Refund failed:', error.message);
      }
    }

    // Send email notification
    const user = await User.findById(req.user.id);
    sendOrderStatusEmail(order, user, 'cancelled').catch(err => 
      console.error('Status update email failed:', err.message)
    );

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};

// ============= ADMIN ROUTES =============

// @desc    Get All Orders (Admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      paymentStatus,
      startDate,
      endDate
    } = req.query;

    // Build query
    const query = {};

    if (status) {
      query.orderStatus = status;
    }

    if (paymentStatus) {
      query['paymentDetails.status'] = paymentStatus;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const total = await Order.countDocuments(query);
    const pagination = getPaginationData(page, limit, total);

    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .sort('-createdAt')
      .skip(pagination.skip)
      .limit(pagination.itemsPerPage);

    res.status(200).json({
      success: true,
      count: orders.length,
      pagination,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Order Status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, trackingNumber, courierName, notes } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const oldStatus = order.orderStatus;

    // Update order
    if (orderStatus) order.orderStatus = orderStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (courierName) order.courierName = courierName;
    if (notes) order.notes = notes;

    // Set delivered date
    if (orderStatus === 'delivered' && !order.deliveredAt) {
      order.deliveredAt = Date.now();
    }

    await order.save();

    // Send status update email
    const user = await User.findById(order.user);
    if (oldStatus !== orderStatus) {
      sendOrderStatusEmail(order, user, orderStatus).catch(err => 
        console.error('Status update email failed:', err.message)
      );
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Order Statistics (Admin)
// @route   GET /api/orders/admin/stats
// @access  Private/Admin
export const getOrderStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    const processingOrders = await Order.countDocuments({ orderStatus: 'processing' });
    const shippedOrders = await Order.countDocuments({ orderStatus: 'shipped' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ orderStatus: 'cancelled' });

    // Calculate total revenue
    const revenueData = await Order.aggregate([
      {
        $match: {
          'paymentDetails.status': 'completed'
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' }
        }
      }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(10);

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue
      },
      recentOrders
    });
  } catch (error) {
    next(error);
  }
};

// ============= HELPER FUNCTIONS =============

// Update product stock after order
const updateProductStock = async (items) => {
  for (const item of items) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { stock: -item.quantity } }
    );
  }
};

// Restore product stock after cancellation
const restoreProductStock = async (items) => {
  for (const item of items) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { stock: item.quantity } }
    );
  }
};

export default {
  createOrder,
  verifyPayment,
  getMyOrders,
  getOrder,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderStats
};
