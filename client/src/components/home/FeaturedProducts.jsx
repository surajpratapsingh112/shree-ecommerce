import { Link } from 'react-router';
import { useState } from 'react';

const FeaturedProducts = () => {
  // Sample products (will be replaced with real data from API)
  const sampleProducts = [
    {
      id: 1,
      name: 'Premium Shampoo Bottles',
      category: 'Guest Amenities',
      price: 450,
      image: '🧴',
      stock: 'In Stock',
      discount: '10% OFF',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Floor Cleaning Liquid',
      category: 'Cleaning Chemicals',
      price: 850,
      image: '🧹',
      stock: 'In Stock',
      discount: null,
      rating: 4.8
    },
    {
      id: 3,
      name: 'A4 Paper Bundle',
      category: 'Office Stationery',
      price: 350,
      image: '📄',
      stock: 'In Stock',
      discount: '15% OFF',
      rating: 4.3
    },
    {
      id: 4,
      name: 'Luxury Soap Bars',
      category: 'Guest Amenities',
      price: 120,
      image: '🧼',
      stock: 'In Stock',
      discount: null,
      rating: 4.7
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            ⭐ HANDPICKED FOR YOU
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium quality products trusted by hundreds of businesses
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {sampleProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <Link to="/products">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                View All Products
                <span className="text-2xl transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Individual Product Card Component
const ProductCard = ({ product, index }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div 
      className="product-card-wrapper group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="product-card relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform-gpu h-full flex flex-col">
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
          {product.discount && (
            <span className="discount-badge bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
              {product.discount}
            </span>
          )}
          <span className="stock-badge bg-white/90 backdrop-blur-sm text-green-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ml-auto border border-green-200">
            ✓ {product.stock}
          </span>
        </div>

        {/* Product Image Section */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-12 text-center overflow-hidden group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-500">
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:to-purple-400/20 transition-all duration-500"></div>
          
          {/* Product Icon/Image with Zoom */}
          <div className="product-image relative z-10 text-8xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            {product.image}
          </div>

          {/* Floating Particles on Hover */}
          <div className="product-particles opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="product-particle product-particle-1"></div>
            <div className="product-particle product-particle-2"></div>
            <div className="product-particle product-particle-3"></div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Category Badge */}
          <div className="category-badge inline-block self-start px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full mb-3">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>

          {/* Price & Add to Cart */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{product.price}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`add-to-cart-btn w-full py-3 rounded-xl font-bold text-white transition-all duration-300 transform ${
                isAdding 
                  ? 'bg-green-500 scale-95' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 hover:shadow-lg'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {isAdding ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    Adding...
                  </>
                ) : (
                  <>
                    <span className="text-lg">🛒</span>
                    Add to Cart
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 via-transparent to-transparent group-hover:from-blue-600/5 transition-all duration-500 pointer-events-none rounded-2xl"></div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
