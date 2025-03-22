import { useEffect } from 'react';
import FirstLayer from '../../components/data/web/Agent/FirstLayer';
import EightLayer from '../../components/data/web/Home/EightLayer';
import NewsletterSection from '../../components/data/web/Home/NewsletterSection';
import TopCities from '../../components/data/web/Home/TopCities';

const Agents = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <FirstLayer />
      <TopCities />
      <EightLayer />
      <NewsletterSection />
    </>
  );
};
export default Agents;
