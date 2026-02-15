import { Link } from 'react-router';
import { CATEGORIES } from '../../utils/constants';

const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            EXPLORE OUR RANGE
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Shop by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium products across different categories, tailored for your business needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {CATEGORIES.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Individual Category Card Component with 3D Effects
const CategoryCard = ({ category, index }) => {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="category-card-wrapper group block h-full"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="category-card relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu perspective-1000 h-full flex flex-col">
        
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-rotate"></div>
        <div className="absolute inset-[2px] rounded-3xl bg-white z-10"></div>
        
        {/* Card Content */}
        <div className="relative z-20">
          {/* Icon Section with Gradient */}
          <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 p-16 text-center overflow-hidden group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-indigo-700 transition-all duration-500">
            
            {/* Particles Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="sparkle sparkle-1"></div>
              <div className="sparkle sparkle-2"></div>
              <div className="sparkle sparkle-3"></div>
              <div className="sparkle sparkle-4"></div>
              <div className="sparkle sparkle-5"></div>
            </div>
            
            {/* Icon with Bounce Animation */}
            <div className="relative z-10 text-8xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-icon-bounce">
              {category.icon}
            </div>
            
            {/* Category Name */}
            <h3 className="relative z-10 text-3xl font-black text-white drop-shadow-lg">
              {category.name}
            </h3>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Info Section */}
          <div className="p-8 flex flex-col justify-between flex-grow">
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              {category.description}
            </p>
            
            {/* CTA Button */}
            <div className="text-center">
              <span className="inline-flex items-center gap-3 text-blue-600 font-bold text-lg group-hover:gap-5 transition-all duration-300">
                <span className="relative">
                  View Products
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
                <span className="text-2xl transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
            </div>
          </div>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20 transition-all duration-500 pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default FeaturedCategories;
