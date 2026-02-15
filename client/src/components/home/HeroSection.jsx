import { Link } from 'react-router';

const HeroSection = () => {
  return (
    <section className="hero-section relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      
      {/* ============================================
          ANIMATED BACKGROUND ELEMENTS
          ============================================ */}
      
      {/* Animated Gradient Waves */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
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
              <span className="glass-badge inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-blue-600 font-bold text-sm shadow-xl">
                <span className="text-xl">✨</span>
                Trusted Since 2013
              </span>
            </div>
            
            {/* Kinetic Typography Heading */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="gradient-text-1 block mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                Premium
              </span>
              <span className="gradient-text-2 morphing-text block mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient-y">
                Hospitality
              </span>
              <span className="gradient-text-3 block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                Supplies
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-700 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              Complete solution for hotels, hospitals & institutions. Guest amenities, cleaning chemicals, 
              office supplies & printing services across <span className="font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Uttar Pradesh & Uttarakhand</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <Link to="/products">
                <button className="glass-button relative px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto overflow-hidden group">
                  <span className="relative z-10">View Products</span>
                  <div className="button-glow absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-xl"></div>
                </button>
              </Link>
              <Link to="/contact">
                <button className="glass-button relative px-8 py-4 rounded-xl font-bold text-gray-700 bg-white/60 backdrop-blur-md border-2 border-white/80 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto overflow-hidden group">
                  <span className="relative z-10">Request Quote</span>
                  <div className="button-glow absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </button>
              </Link>
            </div>

            {/* Animated Stats Cards (3 stats) */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="stat-card animate-scale-in relative p-6 rounded-2xl text-center bg-white/40 backdrop-blur-md border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden" style={{animationDelay: '0.6s'}}>
                <div className="stat-icon text-3xl mb-2">🏆</div>
                <div className="stat-number text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">10+</div>
                <div className="stat-label text-sm text-gray-600 font-semibold mt-1">Years</div>
                <div className="stat-glow absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </div>
              
              <div className="stat-card animate-scale-in relative p-6 rounded-2xl text-center bg-white/40 backdrop-blur-md border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden" style={{animationDelay: '0.8s'}}>
                <div className="stat-icon text-3xl mb-2">📦</div>
                <div className="stat-number text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">500+</div>
                <div className="stat-label text-sm text-gray-600 font-semibold mt-1">Products</div>
                <div className="stat-glow absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </div>
              
              <div className="stat-card animate-scale-in relative p-6 rounded-2xl text-center bg-white/40 backdrop-blur-md border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden" style={{animationDelay: '1s'}}>
                <div className="stat-icon text-3xl mb-2">🤝</div>
                <div className="stat-number text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50+</div>
                <div className="stat-label text-sm text-gray-600 font-semibold mt-1">Clients</div>
                <div className="stat-glow absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* ============================================
              RIGHT CONTENT - 3D CARD GRID
              ============================================ */}
          <div className="relative animate-slide-in-right">
            <div className="hero-3d-container grid grid-cols-2 gap-6 perspective-1000">
              
              {/* Card 1 - Guest Amenities */}
              <div className="hero-card card-1 relative rounded-2xl p-8 text-center bg-white/50 backdrop-blur-lg border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform-gpu hover:-translate-y-2 overflow-hidden group">
                <div className="card-glow absolute inset-0 bg-gradient-to-br from-blue-200/30 to-purple-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="card-content relative z-10">
                  <div className="text-6xl mb-4 animate-float">🛎️</div>
                  <div className="font-bold text-gray-900 text-lg mb-2">Guest Amenities</div>
                  <div className="text-sm text-gray-600">Premium Quality</div>
                </div>
              </div>
              
              {/* Card 2 - Cleaning */}
              <div className="hero-card card-2 relative rounded-2xl p-8 text-center bg-white/50 backdrop-blur-lg border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform-gpu hover:-translate-y-2 overflow-hidden group">
                <div className="card-glow absolute inset-0 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="card-content relative z-10">
                  <div className="text-6xl mb-4 animate-float" style={{animationDelay: '0.2s'}}>🧹</div>
                  <div className="font-bold text-gray-900 text-lg mb-2">Cleaning</div>
                  <div className="text-sm text-gray-600">Professional Grade</div>
                </div>
              </div>
              
              {/* Card 3 - Office Supplies */}
              <div className="hero-card card-3 relative rounded-2xl p-8 text-center bg-white/50 backdrop-blur-lg border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform-gpu hover:-translate-y-2 overflow-hidden group">
                <div className="card-glow absolute inset-0 bg-gradient-to-br from-orange-200/30 to-pink-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="card-content relative z-10">
                  <div className="text-6xl mb-4 animate-float" style={{animationDelay: '0.4s'}}>📝</div>
                  <div className="font-bold text-gray-900 text-lg mb-2">Office Supplies</div>
                  <div className="text-sm text-gray-600">Complete Range</div>
                </div>
              </div>
              
              {/* Card 4 - Printing */}
              <div className="hero-card card-4 relative rounded-2xl p-8 text-center bg-white/50 backdrop-blur-lg border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform-gpu hover:-translate-y-2 overflow-hidden group">
                <div className="card-glow absolute inset-0 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="card-content relative z-10">
                  <div className="text-6xl mb-4 animate-float" style={{animationDelay: '0.6s'}}>🖨️</div>
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="scroll-indicator flex flex-col items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center pt-2">
            <div className="scroll-wheel w-1 h-3 bg-blue-600 rounded-full animate-scroll-wheel"></div>
          </div>
          <span className="text-xs text-gray-500 font-medium">Scroll Down</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
