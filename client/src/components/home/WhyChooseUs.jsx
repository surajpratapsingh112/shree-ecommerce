import React, { useState, useEffect, useRef } from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: 'Quality Products',
      description: 'Premium quality guaranteed on all products',
      icon: '✓',
      iconBg: 'from-blue-500 to-indigo-600',
      number: '100',
      suffix: '%'
    },
    {
      id: 2,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery service',
      icon: '🚚',
      iconBg: 'from-green-500 to-emerald-600',
      number: '24',
      suffix: 'hrs'
    },
    {
      id: 3,
      title: 'Best Prices',
      description: 'Competitive wholesale pricing',
      icon: '💰',
      iconBg: 'from-yellow-500 to-orange-600',
      number: '50',
      suffix: '%'
    },
    {
      id: 4,
      title: 'Expert Support',
      description: '24/7 customer support team',
      icon: '📞',
      iconBg: 'from-purple-500 to-pink-600',
      number: '24/7',
      suffix: ''
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      
      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="why-wave why-wave-1"></div>
        <div className="why-wave why-wave-2"></div>
        <div className="why-wave why-wave-3"></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="why-shape why-shape-1"></div>
        <div className="why-shape why-shape-2"></div>
        <div className="why-shape why-shape-3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm text-blue-600 rounded-full text-sm font-semibold mb-4 border border-blue-200">
            ⭐ WHY CHOOSE US
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trusted Partner</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best products and service to our customers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/60 overflow-hidden">
            
            {/* CTA Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                Ready to Get Started? 🚀
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied customers who trust us for their hospitality supply needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Call Button */}
                <a
                  href="tel:+919876543210"
                  className="cta-button group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📞</span>
                    Call Us Now
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                </a>
                
                {/* Email Button */}
                <a
                  href="mailto:info@shreeenterprises.com"
                  className="cta-button group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">✉️</span>
                    Email Us
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Individual Feature Card Component with Counter Animation
const FeatureCard = ({ feature, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && feature.number !== '24/7') {
      const target = parseInt(feature.number);
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else if (isVisible && feature.number === '24/7') {
      setCount(feature.number);
    }
  }, [isVisible, feature.number]);

  return (
    <div
      ref={cardRef}
      className="feature-card-wrapper"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="feature-card relative bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu h-full border border-white/60 overflow-hidden group">
        
        {/* Card Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-2xl"></div>
        
        <div className="relative z-10">
          {/* Icon with Gradient Background */}
          <div className={`w-20 h-20 bg-gradient-to-br ${feature.iconBg} rounded-2xl flex items-center justify-center text-4xl shadow-lg mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
            <span className="filter drop-shadow-lg">{feature.icon}</span>
          </div>

          {/* Animated Counter */}
          <div className="mb-4">
            <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {count}{feature.suffix}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {feature.description}
          </p>

          {/* Hover Sparkle */}
          <div className="feature-sparkles opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="feature-sparkle feature-sparkle-1"></div>
            <div className="feature-sparkle feature-sparkle-2"></div>
            <div className="feature-sparkle feature-sparkle-3"></div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.iconBg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
