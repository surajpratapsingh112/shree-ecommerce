import { Link, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { APP_NAME } from '../../utils/constants';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-gray-100">
      {/* Top Bar - Modern Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-blue-100 transition-all duration-300 group">
              <span className="text-lg group-hover:scale-110 transition-transform">📞</span>
              <span className="font-medium">+91 9876543210</span>
            </a>
            <a href="mailto:info@shreeenterprises.com" className="flex items-center gap-2 hover:text-blue-100 transition-all duration-300 group">
              <span className="text-lg group-hover:scale-110 transition-transform">✉️</span>
              <span className="font-medium hidden sm:inline">info@shreeenterprises.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="hover:text-blue-100 transition-all duration-300 flex items-center gap-1.5 group">
                  <span className="group-hover:scale-110 transition-transform">👤</span>
                  <span className="font-medium hidden sm:inline">{user?.name}</span>
                </Link>
                <button onClick={logout} className="hover:text-blue-100 transition-all duration-300 font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-100 transition-all duration-300 font-medium">
                  Login
                </Link>
                <Link to="/register" className="hover:text-blue-100 transition-all duration-300 font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header - Glass Effect */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Original Image with Animation */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Shree Enterprises Logo" 
              className="h-16 w-16 object-contain transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
            />
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                {APP_NAME}
              </h1>
              <p className="text-xs text-gray-600 font-medium italic">We believe in Service</p>
            </div>
          </Link>

          {/* Navigation - Modern with Active States */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" isActive={isActive('/')}>
              Home
            </NavLink>
            <NavLink to="/products" isActive={isActive('/products')}>
              Products
            </NavLink>
            <NavLink to="/about" isActive={isActive('/about')}>
              About
            </NavLink>
            <NavLink to="/contact" isActive={isActive('/contact')}>
              Contact
            </NavLink>
          </nav>

          {/* Cart Button - 3D Effect */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">🛒</span>
              <span className="hidden md:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold animate-pulse shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex gap-4 text-sm border-t pt-4">
          <MobileNavLink to="/" isActive={isActive('/')}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/products" isActive={isActive('/products')}>
            Products
          </MobileNavLink>
          <MobileNavLink to="/about" isActive={isActive('/about')}>
            About
          </MobileNavLink>
          <MobileNavLink to="/contact" isActive={isActive('/contact')}>
            Contact
          </MobileNavLink>
        </nav>
      </div>
    </header>
  );
};

// Modern Nav Link Component with Active State
const NavLink = ({ to, isActive, children }) => {
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 font-semibold transition-all duration-300 group ${
        isActive 
          ? 'text-blue-600' 
          : 'text-gray-700 hover:text-blue-600'
      }`}
    >
      {children}
      
      {/* Animated Underline */}
      <span 
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ${
          isActive 
            ? 'w-full' 
            : 'w-0 group-hover:w-full'
        }`}
      />
      
      {/* Hover Glow Effect */}
      {!isActive && (
        <span className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      )}
    </Link>
  );
};

// Mobile Nav Link
const MobileNavLink = ({ to, isActive, children }) => {
  return (
    <Link
      to={to}
      className={`relative font-semibold transition-all duration-300 ${
        isActive 
          ? 'text-blue-600' 
          : 'text-gray-700'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      )}
    </Link>
  );
};

export default Header;
