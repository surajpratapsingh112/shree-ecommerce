import React from 'react';

const WhyChooseUs = () => {
  const features = [
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

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best products and service to our customers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl text-white mb-6 shadow-lg">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust us for their hospitality supply needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* यहाँ गलती थी - <a> टैग जोड़ा गया है */}
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              📞 Call Us Now
            </a>
            
            <a
              href="mailto:info@shreeenterprises.com"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;