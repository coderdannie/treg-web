import SearchFilters from '../../components/data/web/Properties/SearchFilters.js';
import { properties } from '../../components/common/constants.js';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyCard from '../../components/common/PropertyCard.js';

const Properties = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { filter } = useParams();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  console.log(filter);

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className=" align-element ">
      <SearchFilters />
      <div>
        {' '}
        <h3 className="text-lg  sm:text-xl md:text-2xl font-semibold text-[#18181B] ">
          Browse New Property Listings
        </h3>
        <div className="mx-auto pt-5 ">
          <div
            ref={ref}
            className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {properties.map((property) => (
              <PropertyCard
                property={property}
                cardVariants={cardVariants}
                controls={controls}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Properties;
