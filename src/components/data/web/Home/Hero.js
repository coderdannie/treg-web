import { motion, useSpring, useTransform } from 'framer-motion';
import Balancer from 'react-wrap-balancer';
import heroBg from '../../../../assets/hero-gradient.png';
import heroBg2 from '../../../../assets/vectorBg.png';
import { filterOptions } from '../../../common/constants';
import { useState, useEffect, useRef } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

// Utility function to combine class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Debounce function to limit ResizeObserver callbacks
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

function FeatureCard({
  feature,
  hide,
  className,
  zIndexOffset = 0,
  isSecondCard = false,
  ...props
}) {
  const { title, category, imageUrl } = feature;
  const springValue = useSpring(0, {
    bounce: 0,
  });

  // Use a different scale range for the second card
  const scale = useTransform(
    springValue,
    [0, 1],
    isSecondCard ? [1.1, 1.2] : [1, 1.1] // Second card starts at 1.1 and scales to 1.2 on hover
  );

  const zIndex = useTransform(
    springValue,
    (value) => +Math.floor(value * 10) + 10 + zIndexOffset
  );

  const content = (
    <div
      className={`relative ${hide} min-991:flex h-full w-full flex-col rounded-xl bg-white overflow-hidden`}
    >
      {/* Image Container */}
      <div className="w-full h-[80%] overflow-hidden">
        <img
          src={imageUrl}
          alt="houses"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="flex gap-2 pt-3 justify-between">
        <div className="flex items-center">
          <span className="block w-2 h-2 rounded-full bg-[#26BAEC]"></span>
          <small className="inline w-fit rounded-xl bg-opacity-50 px-2 py-1 text-xs leading-none text-[#475467]">
            {category}
          </small>
        </div>

        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <small className="inline w-fit pt-1 rounded-xl bg-opacity-50 px-2 py-1 text-xs leading-none text-[#475467]">
        2 bed 3 bath
      </small>
    </div>
  );

  const containerClassName = cn(
    `relative flex-none md:max-w-[300px] lg:max-w-[290px] xl:max-w-[350px] w-full flex-col overflow-hidden p-2 border border-[#AAA7A7] rounded-2xl bg-white shadow-2xl transition-shadow duration-300 ease-in-out hover:shadow-xl ${
      hide
        ? 'md:h-[400px] lg:h-[420px] xl:h-[450px] scale-200'
        : 'md:h-[380px] lg:h-[400px] xl:h-[430px]'
    }`,
    className
  );

  // Ref for the card container
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const resizeObserver = new ResizeObserver(
      debounce((entries) => {
        entries.forEach((entry) => {
          // Handle resize logic here if needed
        });
      }, 100) // Adjust debounce delay as needed
    );

    resizeObserver.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        resizeObserver.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseEnter={() => springValue.set(1)} // Always allow hover scaling
        onMouseLeave={() => springValue.set(0)}
        style={{
          zIndex,
          scale,
        }}
        className={cn(containerClassName, `${hide} min-991:flex`)}
        {...props}
      >
        {content}
      </motion.div>
      <motion.div
        initial={{ y: 100 }}
        whileInView={{ y: 0, transition: { duration: 0.5 } }}
        className={cn(containerClassName, 'flex sm:hidden')}
      >
        {content}
      </motion.div>
    </>
  );
}

export default function ProductFeatures() {
  const cardWidth = 48 * 4; // w-48 x 4
  const angle = 6;
  const yOffset = 30;
  const sentence = 'Rent your next home with confidence';
  const words = sentence.split(' ');

  const [openDropdown, setOpenDropdown] = useState(null);
  return (
    <section
      className="storybook-fix  px-4 sm:px-0 flex  w-full flex-col items-center gap-4 py-14 md:py-10 hero "
      style={{
        backgroundImage: `url(${heroBg2}), url(${heroBg})`,
        backgroundPosition: 'top center, bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover, cover',
      }}
    >
      <motion.header
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
        className="flex flex-col items-center gap-2 text-center"
      >
        {' '}
        <p class="flex  text-[#616161] px-5 py-1 bg-[#FBFBFB] text-[10px] sm:text-xs md:text-sm rounded-full border-2 mx-auto border-[#CCCCCC94] w-fit font-normal gap-2">
          <img className="w-4" src="/assets/Group.svg" alt="" />
          The top choice for anyone looking to rent a home
        </p>
        <h1 className="font-heading">
          {words.map((word, index) => (
            <span
              key={index}
              className="animated-word"
              style={{ '--i': index + 1 }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>
        <Balancer className="block text-sm md:text-lg text-neutral-500 max-w-[500px] w-full ">
          Simplify your rental experience with secure transactions, transparent
          ratings and detailed property views.
        </Balancer>
      </motion.header>

      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <div className="hidden sm:flex items-center  gap-4 bg-white">
          <ul className="flex border border-[#D4D4D4] rounded-md space-x-4 sm:space-x-8 justify-center text-[#818181] font-medium py-3 px-7">
            {filterOptions.map((item) => (
              <li key={item.id} className="relative group">
                {/* Parent Menu Item */}
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.id ? null : item.id)
                  }
                  className="hover:text-primary text-xs sm:text-sm font-normal transition flex items-center gap-1"
                >
                  {item.text}
                  {item.sub && (
                    <RiArrowDownSLine
                      className={`transition-transform duration-300 ${
                        openDropdown === item.id ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.sub && openDropdown === item.id && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeOut',
                      staggerChildren: 0.1,
                    }}
                    className="absolute grid gap-2 pb-3 left-0 mt-4 w-[185px] bg-white px-[6px] py-[6px] shadow-xl border rounded-md overflow-hidden z-50"
                    onMouseEnter={() => setOpenDropdown(item.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.sub.map((subItem) => (
                      <motion.li
                        key={subItem.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 py-1 text-[#061C3D] hover:bg-[#F0F5FF] cursor-pointer text-sm"
                      >
                        <button onClick={() => setOpenDropdown(null)}>
                          {subItem.name}
                        </button>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </li>
            ))}
          </ul>
          <button className="primary-btn">Search</button>
        </div>
        <ul className="flex sm:hidden mt-4 items-center gap-3">
          <li>
            <Link
              className=" cursor-pointer rounded-md  bg-white  px-5 py-[10px] text-center text-sm font-semibold text-primary transition duration-300 ease-in-out hover:bg-white border-2 hover:border-2  hover:text-primary border-primary"
              to="/login"
            >
              Log in
            </Link>
          </li>
          <li>
            <Link className=" primary-btn" to="/create-account">
              Sign up
            </Link>
          </li>
        </ul>
      </motion.div>

      <div className="relative flex w-full flex-wrap justify-center gap-12 px-4 py-12 max-768:hidden  sm:gap-4">
        <FeatureCard
          feature={{
            category: 'Duplex',
            imageUrl: '/assets/herobg1.jpg',
            title: '₦640,000',
          }}
          initial={{
            x: cardWidth,
            y: yOffset,
            opacity: 0,
            rotate: 0,
            scale: 0.9,
          }}
          animate={{
            x: yOffset,
            y: 10,
            opacity: 1,
            scale: 0.95,
            rotate: -angle,
            transition: {
              type: 'spring',
              delay: 0.8,
            },
          }}
        />

        <FeatureCard
          feature={{
            category: 'Detached',
            title: '₦740,000',
            imageUrl: '/assets/herobg2.jpg',
          }}
          hide="hidden"
          large
          screens
          and
          above
          initial={{
            y: yOffset,
            opacity: 0,
            scale: 2.0, // Normal scale initially
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1.1, // Slightly enlarge on animation
            transition: {
              type: 'spring',
              delay: 0.4,
            },
          }}
          zIndexOffset={2} // Ensure it appears above others
          isSecondCard // Add this prop
        />
        <FeatureCard
          feature={{
            category: 'Detached',
            title: '₦1,840,000',
            imageUrl: '/assets/herobg3.jpg',
          }}
          initial={{
            x: -cardWidth,
            y: yOffset,
            opacity: 0,
            rotate: 0,
            scale: 0.9,
          }}
          animate={{
            x: -yOffset,
            y: 10,
            opacity: 1,
            rotate: angle,
            scale: 0.95,
            transition: {
              type: 'spring',
              delay: 0.6,
            },
          }}
        />
      </div>
    </section>
  );
}
