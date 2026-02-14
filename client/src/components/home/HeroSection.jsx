import { Link } from 'react-router';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      
      {/* ============================================
          ANIMATED BACKGROUND ELEMENTS
          ============================================ */}
      
      {/* Animated Gradient Waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Floating Particles (10 particles) */}
      <div className="particles-container">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="particle particle-7"></div>
        <div className="particle particle-8"></div>
        <div className="particle particle-9"></div>
        <div className="particle particle-10"></div>
      </div>

      {/* 3D Floating Shapes (4 shapes) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="shape-3d shape-3d-1"></div>
        <div className="shape-3d shape-3d-2"></div>
        <div className="shape-3d shape-3d-3"></div>
        <div className="shape-3d shape-3d-4"></div>
      </div>

      {/* ============================================
          MAIN CONTENT - PROPERLY CENTERED
          ============================================ */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* ============================================
              LEFT CONTENT
              ============================================ */}
          <div className="space-y-8 animate-slide-in-left">
            
            {/* Glass Badge */}
            <div className="inline-block animate-bounce-in">
              <span className="glass-badge inline-flex items-center gap-2 px-6 py-3 rounded-full text-blue-600 font-bold text-sm shadow-lg">
                <span className="text-xl">✨</span>
                Trusted Since 2013
              </span>
            </div>
            
            {/* Kinetic Typography Heading */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="gradient-text-1 block mb-2">Premium</span>
              <span className="gradient-text-2 morphing-text block mb-2">Hospitality</span>
              <span className="gradient-text-3 block">Supplies</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-700 leading-relaxed animate-fade-in-up">
              Complete solution for hotels, hospitals & institutions. Guest amenities, cleaning chemicals, 
              office supplies & printing services across <span className="font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Uttar Pradesh & Uttarakhand</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
              <Link to="/products">
                <button className="glass-button relative px-8 py-4 rounded-xl font-bold text-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  <span className="relative z-10">View Products</span>
                  <div className="button-glow rounded-xl"></div>
                </button>
              </Link>
              <Link to="/contact">
                <button className="glass-button relative px-8 py-4 rounded-xl font-bold text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  <span className="relative z-10">Request Quote</span>
                  <div className="button-glow rounded-xl"></div>
                </button>
              </Link>
            </div>

            {/* Animated Stats Cards (3 stats) */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="stat-card animate-scale-in relative p-6 rounded-2xl text-center shadow-lg">
                <div className="stat-icon text-3xl mb-2">🏆</div>
                <div className="stat-number text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">10+</div>
                <div className="stat-label text-sm text-gray-600 font-semibold mt-1">Years</div>
                <div className="stat-glow rounded-2xl"></div>
              </div>
              
              <div className="stat-card animate-scale-in relative p-6 rounded-2xl text-center shadow-lg">
                <div className="stat-icon text-3xl mb-2">📦</div>
                <div className="stat-number text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">500+</div>
                <div className="stat-label text-sm text-gray-600 font-semibold mt-1">Products</div>
                <div className="stat-glow rounded-2xl"></div>
              </div>
              
              <div className="stat-card animate-scale-in relative p-6 rounded-2xl text-center shadow-lg">
                <div className="stat-icon text-3xl mb-2">🤝</div>
                <div className="stat-number text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50+</div>
                <div className="stat-label text-sm text-gray-600 font-semibold mt-1">Clients</div>
                <div className="stat-glow rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* ============================================
              RIGHT CONTENT - 3D CARD GRID
              ============================================ */}
          <div className="relative animate-slide-in-right">
            <div className="hero-3d-container grid grid-cols-2 gap-6">
              
              {/* Card 1 - Guest Amenities */}
              <div className="hero-card card-1 relative rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="card-glow rounded-2xl"></div>
                <div className="card-content">
                  <div className="text-6xl mb-4 animate-float">🛎️</div>
                  <div className="font-bold text-gray-900 text-lg mb-2">Guest Amenities</div>
                  <div className="text-sm text-gray-600">Premium Quality</div>
                </div>
              </div>
              
              {/* Card 2 - Cleaning */}
              <div className="hero-card card-2 relative rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="card-glow rounded-2xl"></div>
                <div className="card-content">
                  <div className="text-6xl mb-4 animate-float">🧹</div>
                  <div className="font-bold text-gray-900 text-lg mb-2">Cleaning</div>
                  <div className="text-sm text-gray-600">Professional Grade</div>
                </div>
              </div>
              
              {/* Card 3 - Office Supplies */}
              <div className="hero-card card-3 relative rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="card-glow rounded-2xl"></div>
                <div className="card-content">
                  <div className="text-6xl mb-4 animate-float">📝</div>
                  <div className="font-bold text-gray-900 text-lg mb-2">Office Supplies</div>
                  <div className="text-sm text-gray-600">Complete Range</div>
                </div>
              </div>
              
              {/* Card 4 - Printing */}
              <div className="hero-card card-4 relative rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="card-glow rounded-2xl"></div>
                <div className="card-content">
                  <div className="text-6xl mb-4 animate-float">🖨️</div>
                  <div className="font-bold text-gray-900 text-lg mb-2">Printing</div>
                  <div className="text-sm text-gray-600">Custom Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          SCROLL INDICATOR
          ============================================ */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="scroll-indicator">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
