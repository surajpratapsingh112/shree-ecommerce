import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyChooseUs />
    </div>
  );
};

export default Home;