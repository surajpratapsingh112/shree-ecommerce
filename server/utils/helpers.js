import crypto from 'crypto';

// Generate Random String
export const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate Order Number
export const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD${year}${month}${day}${random}`;
};

// Format Price (Indian Rupee)
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(price);
};

// Calculate Discount Percentage
export const calculateDiscount = (mrp, sellingPrice) => {
  if (!mrp || mrp <= sellingPrice) return 0;
  return Math.round(((mrp - sellingPrice) / mrp) * 100);
};

// Calculate GST
export const calculateGST = (amount, gstRate = 18) => {
  const gstAmount = (amount * gstRate) / 100;
  return {
    gstAmount: Math.round(gstAmount * 100) / 100,
    totalAmount: Math.round((amount + gstAmount) * 100) / 100,
    gstRate: gstRate
  };
};

// Pagination Helper
export const getPaginationData = (page = 1, limit = 10, total) => {
  const currentPage = parseInt(page);
  const itemsPerPage = parseInt(limit);
  const totalPages = Math.ceil(total / itemsPerPage);
  const skip = (currentPage - 1) * itemsPerPage;

  return {
    currentPage,
    totalPages,
    totalItems: total,
    itemsPerPage,
    skip,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};

// Sanitize User Input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

// Validate Indian Phone Number
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Validate Indian PIN Code
export const validatePinCode = (pinCode) => {
  const pinCodeRegex = /^[1-9][0-9]{5}$/;
  return pinCodeRegex.test(pinCode);
};

// Generate Slug from String
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Calculate Estimated Delivery Date
export const getEstimatedDeliveryDate = (daysToAdd = 7) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date;
};

// Format Date
export const formatDate = (date, locale = 'en-IN') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

// Check if Product is In Stock
export const checkStock = (product, quantity = 1) => {
  return product.stock >= quantity;
};

// Calculate Cart Total
export const calculateCartTotal = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = calculateGST(subtotal);
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    gst: gst.gstAmount,
    total: gst.totalAmount,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
  };
};

// Generate Password Reset Token
export const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  return {
    resetToken,
    hashedToken,
    resetTokenExpire: Date.now() + 15 * 60 * 1000 // 15 minutes
  };
};

// Verify Reset Token
export const verifyResetToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

// Round to 2 decimal places
export const roundToTwo = (num) => {
  return Math.round(num * 100) / 100;
};

// Generate SKU
export const generateSKU = (categoryCode, productName) => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const nameCode = productName.substring(0, 3).toUpperCase();
  return `${categoryCode}-${nameCode}-${randomNum}`;
};

// Check if Email is Valid
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get File Extension
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Convert Bytes to Human Readable
export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

export default {
  generateRandomString,
  generateOrderNumber,
  formatPrice,
  calculateDiscount,
  calculateGST,
  getPaginationData,
  sanitizeInput,
  validatePhoneNumber,
  validatePinCode,
  generateSlug,
  getEstimatedDeliveryDate,
  formatDate,
  checkStock,
  calculateCartTotal,
  generateResetToken,
  verifyResetToken,
  roundToTwo,
  generateSKU,
  isValidEmail,
  getFileExtension,
  bytesToSize
};
