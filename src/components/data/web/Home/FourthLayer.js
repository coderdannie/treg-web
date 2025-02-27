import { Link } from 'react-router-dom';
import { exploreData } from '../../../common/constants';
import { motion } from 'framer-motion';

const FourthLayer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'linear', staggerChildren: 0.3 },
    },
  };

  const metaVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="align-element pt-10 md:pt-16 text-center pb-[100px]"
    >
      <div className=" max-w-[650px] lg:max-w-[850px] w-full mx-auto ">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#18181B] ">
          Explore nearby Properties
        </h3>
        <p className="text-xs sm:text-sm mb-8  md:text-lg pt-4 text-[#797878]">
          Find the perfect rental close to you, organized by category for easy
          browsing. Whether you're looking for apartments, family homes, or
          luxury rentals, explore nearby options that fit your lifestyle
        </p>
      </div>
      <div className="grid max-w-[550px] px-2 sm:px-4  md:max-w-[999px] mx-auto md:grid-cols-2 gap-5 md:gap-8  mt-12">
        {exploreData.map((item, index) => (
          <div
            key={index}
            className="group relative min-h-[300px] bg-cover h-full bg-center rounded-2xl overflow-hidden cursor-pointer"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-all duration-500 ease-in-out group-hover:from-primary"></div>
            <div className="relative z-10 max-w-[550px] w-full mx-auto px-8 pb-8 h-full flex flex-col justify-end">
              <div className="flex justify-between gap-2">
                <motion.div
                  style={{ fontFamily: 'sansation' }}
                  className="meta bg-white font-bold text-[#282828] py-2 px-3 w-fit rounded-md flex items-center text-xs sm:text-sm "
                  variants={metaVariants}
                >
                  <div className="rounded-full bg-[#3B2770] w-2 h-2 mr-2"></div>
                  {item.meta}
                </motion.div>
                <motion.p
                  className="grid place-items-center text-black rounded-lg bg-[#E8F8FD] font-medium px-4 border border-[#A4E2F7]"
                  variants={textVariants}
                >
                  {item.text}
                </motion.p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
export default FourthLayer;
