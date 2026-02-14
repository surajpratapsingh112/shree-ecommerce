import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { APP_NAME } from '../../utils/constants';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>📞 +91 9876543210</span>
            <span>✉️ info@shreeenterprises.com</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="hover:text-blue-200">
                  👤 {user?.name}
                </Link>
                <button onClick={logout} className="hover:text-blue-200">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link to="/register" className="hover:text-blue-200">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-3xl">🏢</div>
            <div>
              <h1 className="text-2xl font-bold text-blue-600">{APP_NAME}</h1>
              <p className="text-xs text-gray-600">Hospitality Supplies</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </nav>

          {/* Cart & Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="text-xl">🛒</span>
              <span className="hidden md:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex gap-4 text-sm">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600">
            Products
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;