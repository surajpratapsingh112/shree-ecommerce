import { Link } from 'react-router';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block bg-blue-500 bg-opacity-50 px-4 py-2 rounded-full text-sm font-medium">
              ⭐ Trusted by 500+ Hotels & Businesses
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Premium Hospitality Supplies
              <span className="block text-blue-200 mt-2">At Your Doorstep</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              From guest amenities to cleaning supplies and office stationery - 
              We provide everything your business needs with unmatched quality and service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                  🛍️ Browse Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600">
                  📞 Contact Us
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-400">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-blue-200 text-sm">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-blue-200 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="relative hidden md:block animate-float">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
              <div className="space-y-4">
                {/* Product Categories Icons */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-center hover:scale-110 transition-transform">
                    <div className="text-5xl mb-2">🛎️</div>
                    <div className="text-sm font-medium">Amenities</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-center hover:scale-110 transition-transform">
                    <div className="text-5xl mb-2">🧹</div>
                    <div className="text-sm font-medium">Cleaning</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-center hover:scale-110 transition-transform">
                    <div className="text-5xl mb-2">📝</div>
                    <div className="text-sm font-medium">Stationery</div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="bg-white bg-opacity-20 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">✓</div>
                    <span className="font-medium">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">✓</div>
                    <span className="font-medium">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">✓</div>
                    <span className="font-medium">Best Prices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;