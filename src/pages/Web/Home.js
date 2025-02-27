import EightLayer from '../../components/data/web/Home/EightLayer';
import FifthLayer from '../../components/data/web/Home/FifthLayer';
import Footer from '../../components/data/web/Home/Footer';
import FourthLayer from '../../components/data/web/Home/FourthLayer';
import Hero from '../../components/data/web/Home/Hero';
import NewsletterSection from '../../components/data/web/Home/NewsletterSection';
import SecondLayer from '../../components/data/web/Home/SecondLayer';
import TopCities from '../../components/data/web/Home/TopCities';
import SixthLayer from '../../components/data/web/Home/SixthLayer';
import ThirdLayer from '../../components/data/web/Home/ThirdLayer';

const Home = () => {
  return (
    <>
      <Hero />
      <SecondLayer />
      <ThirdLayer />
      <FourthLayer />
      <FifthLayer />
      <SixthLayer />
      <TopCities />
      <EightLayer />
      <NewsletterSection />
    </>
  );
};
export default Home;
