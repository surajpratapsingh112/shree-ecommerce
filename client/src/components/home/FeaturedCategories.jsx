import { Link } from 'react-router';
import { CATEGORIES } from '../../utils/constants';

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Category Icon/Image */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-12 text-center group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
                  <div className="text-7xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <p className="text-gray-600 text-center mb-4">
                    {category.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                      View Products
                      <span className="text-xl">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;