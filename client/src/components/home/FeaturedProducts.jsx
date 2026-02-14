import { Link } from 'react-router';
import Button from '../common/Button';

const FeaturedProducts = () => {
  // Sample products (will be replaced with real data from API)
  const sampleProducts = [
    {
      id: 1,
      name: 'Premium Shampoo Bottles',
      category: 'Guest Amenities',
      price: 450,
      image: '🧴',
      stock: 'In Stock'
    },
    {
      id: 2,
      name: 'Floor Cleaning Liquid',
      category: 'Cleaning Chemicals',
      price: 850,
      image: '🧹',
      stock: 'In Stock'
    },
    {
      id: 3,
      name: 'A4 Paper Bundle',
      category: 'Office Stationery',
      price: 350,
      image: '📄',
      stock: 'In Stock'
    },
    {
      id: 4,
      name: 'Luxury Soap Bars',
      category: 'Guest Amenities',
      price: 120,
      image: '🧼',
      stock: 'In Stock'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked quality products for your business needs
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="bg-gray-100 p-8 text-center group-hover:bg-blue-50 transition-colors">
                <div className="text-7xl mb-4">{product.image}</div>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                  {product.stock}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="text-xs text-blue-600 font-medium mb-2">
                  {product.category}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{product.price}
                  </div>
                  <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/products">
            <Button size="lg" variant="outline">
              View All Products →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;