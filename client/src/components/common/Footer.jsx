import { Link } from 'react-router';
import { useState } from 'react';
import { APP_NAME } from '../../utils/constants';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-300 overflow-hidden">
      
      {/* Animated Wave Top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: '80px', transform: 'translateY(-1px)' }}>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="footer-wave"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <path
            d="M0,60 C240,100 480,40 720,60 C960,80 1200,20 1440,60 L1440,0 L0,0 Z"
            className="footer-wave-path"
          />
        </svg>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="footer-glow footer-glow-1"></div>
        <div className="footer-glow footer-glow-2"></div>
        <div className="footer-glow footer-glow-3"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="footer-section space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Shree Enterprises Logo" 
                className="h-16 w-16 rounded-full object-cover border-2 border-white/20 transform hover:scale-110 hover:rotate-6 transition-all duration-300"
              />
              <h3 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {APP_NAME}
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner in hospitality supplies. Quality products, competitive prices, and reliable service since 2013.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 pt-4">
              <SocialIcon icon="📘" label="Facebook" href="#" />
              <SocialIcon icon="🐦" label="Twitter" href="#" />
              <SocialIcon icon="📷" label="Instagram" href="#" />
              <SocialIcon icon="💼" label="LinkedIn" href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/about" text="About Us" />
              <FooterLink to="/products" text="Products" />
              <FooterLink to="/contact" text="Contact" />
              <FooterLink to="/orders" text="Track Order" />
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Categories
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/products?category=guest-amenities" text="Guest Amenities" />
              <FooterLink to="/products?category=cleaning-chemicals" text="Cleaning Chemicals" />
              <FooterLink to="/products?category=office-stationery" text="Office Stationery" />
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="footer-section">
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Stay Updated
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h4>
            
            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  disabled={subscribed}
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 min-w-[110px] ${
                    subscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {subscribed ? '✓ Done!' : 'Subscribe'}
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <ContactItem icon="📍" text="Lucknow, Uttar Pradesh" />
              <ContactItem icon="📞" text="+91 9876543210" />
              <ContactItem icon="✉️" text="info@shreeenterprises.com" />
              <ContactItem icon="🕒" text="Mon - Sat: 9AM - 6PM" />
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400">
            © 2026 <span className="text-white font-semibold">{APP_NAME}</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="/privacy-policy" className="footer-link text-gray-400 hover:text-white transition-colors duration-300 relative">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="footer-link text-gray-400 hover:text-white transition-colors duration-300 relative">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="footer-link text-gray-400 hover:text-white transition-colors duration-300 relative">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>

    {/* Back to Top Button - Outside Footer */}
    <button
      onClick={scrollToTop}
      className="back-to-top fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 z-[9999] flex items-center justify-center group cursor-pointer"
      aria-label="Back to top"
      style={{ pointerEvents: 'auto' }}
    >
      <span className="text-3xl font-bold transform group-hover:-translate-y-1 transition-transform duration-300">
        ↑
      </span>
    </button>
  </>
  );
};

// Social Icon Component
const SocialIcon = ({ icon, label, href }) => {
  return (
    <a
      href={href}
      aria-label={label}
      className="social-icon w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent hover:scale-110 transition-all duration-300 hover:shadow-lg"
    >
      {icon}
    </a>
  );
};

// Footer Link Component
const FooterLink = ({ to, text }) => {
  return (
    <li>
      <Link
        to={to}
        className="footer-link group inline-flex items-center gap-2 hover:text-white transition-colors duration-300 hover:translate-x-1"
      >
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-400">
          →
        </span>
        {text}
      </Link>
    </li>
  );
};

// Contact Item Component
const ContactItem = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group">
      <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Footer;
