// API Base URL
export const API_BASE_URL = 'http://localhost:5000/api';

// App Info
export const APP_NAME = 'SHREE ENTERPRISES';
export const APP_TAGLINE = 'Your Trusted Partner in Hospitality Supplies';

// Categories
export const CATEGORIES = [
  {
    id: 1,
    name: 'Guest Amenities',
    slug: 'guest-amenities',
    description: 'Premium hotel amenities for your guests',
    icon: '🛎️',
    image: '/images/categories/amenities.jpg'
  },
  {
    id: 2,
    name: 'Cleaning Chemicals',
    slug: 'cleaning-chemicals',
    description: 'Professional cleaning solutions',
    icon: '🧹',
    image: '/images/categories/cleaning.jpg'
  },
  {
    id: 3,
    name: 'Office Stationery',
    slug: 'office-stationery',
    description: 'Complete office supplies',
    icon: '📝',
    image: '/images/categories/stationery.jpg'
  }
];

// Why Choose Us
export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: 'Quality Products',
    description: 'Premium quality guaranteed on all products',
    icon: '✓'
  },
  {
    id: 2,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery service',
    icon: '🚚'
  },
  {
    id: 3,
    title: 'Best Prices',
    description: 'Competitive wholesale pricing',
    icon: '💰'
  },
  {
    id: 4,
    title: 'Expert Support',
    description: '24/7 customer support team',
    icon: '📞'
  }
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Payment Methods
export const PAYMENT_METHODS = {
  COD: 'cod',
  ONLINE: 'online'
};

// GST Rate
export const GST_RATE = 0.18; // 18%

// Pagination
export const ITEMS_PER_PAGE = 12;