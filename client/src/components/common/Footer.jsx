import { Link } from 'react-router';
import { APP_NAME } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🏢</div>
              <h3 className="text-xl font-bold text-white">{APP_NAME}</h3>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted partner in hospitality supplies. Quality products, competitive prices, and reliable service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=guest-amenities" className="hover:text-white transition-colors">
                  Guest Amenities
                </Link>
              </li>
              <li>
                <Link to="/products?category=cleaning-chemicals" className="hover:text-white transition-colors">
                  Cleaning Chemicals
                </Link>
              </li>
              <li>
                <Link to="/products?category=office-stationery" className="hover:text-white transition-colors">
                  Office Stationery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Lucknow, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>info@shreeenterprises.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕒</span>
                <span>Mon - Sat: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © 2026 {APP_NAME}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;