import { Link } from 'react-router-dom';
import { properties } from '../../../common/constants';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import PropertyCard from '../../../common/PropertyCard';
import { useGetAllPublicProperties } from '../../../../services/query/properties';

const ThirdLayer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { data } = useGetAllPublicProperties();
  console.log(data);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

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
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'linear' }}
      className="align-element pt-10 md:pt-0 text-center"
    >
      <div className=" max-w-[650px] lg:max-w-[850px] w-full mx-auto ">
        <h2 className="font-sub-heading !font-semibold ">
          Featured Properties
        </h2>
        <p className="text-xs sm:text-sm mb-8  md:text-lg pt-4 text-[#797878]">
          Discover top-rated rentals handpicked for quality, location, and
          value. Our featured properties offer exceptional amenities and
          standout appeal, making it easier to find a home you’ll love
        </p>
        <Link className="secondary-btn " to="/properties/New%20Listings">
          View all
        </Link>
      </div>
      <div className="mx-auto py-4 mt-8">
        <div
          ref={ref}
          className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {data?.data?.slice(0, 8)?.map((property, index) => (
            <PropertyCard
              property={property}
              controls={controls}
              cardVariants={cardVariants}
              custom={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
export default ThirdLayer;
