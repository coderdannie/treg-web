import React, { useRef, useEffect, useState } from 'react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { topCitiesData } from '../../../common/constants';

const TopCities = () => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Function to scroll left
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Automatic scrolling
  useEffect(() => {
    const carousel = carouselRef.current;

    const autoScroll = () => {
      if (!isPaused && carousel) {
        const isAtEnd =
          carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;

        if (isAtEnd) {
          // If at the end, scroll back to the start
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Otherwise, scroll right
          carousel.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    };

    const interval = setInterval(autoScroll, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isPaused]);

  // Pause auto-scroll on user interaction
  const handleUserInteraction = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  return (
    <div className="flex justify-end mt-12 gap-3 mb-[100px] flex-col align-element">
      <div className="flex justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-2xl font-medium md:text-4xl text-[#3E3E3E]">
            Top cities with beautiful homes
          </h2>
          <p className="text-gray-600 mt-2 max-w-[600px]">
            From modern apartments in bustling urban areas to charming houses
            with scenic views, these cities offer homes that capture both
            comfort and elegance.
          </p>
        </div>
        <div className="flex relative gap-4">
          <button
            onClick={() => {
              scrollLeft();
              handleUserInteraction();
            }}
            className="top-0 grid place-items-center rounded-full right-0 bg-primary text-white w-10 h-10 md:w-12 md:h-12 translate-x-0 left-[-80px] md:left-[-0px] translate-y-0 text-2xl font-bold"
          >
            <GoArrowLeft />
          </button>

          <button
            onClick={() => {
              scrollRight();
              handleUserInteraction();
            }}
            className="top-0 grid place-items-center rounded-full right-0 bg-primary text-white w-10 h-10 md:w-12 md:h-12 translate-x-0 left-[-80px] md:left-[-0px] translate-y-0 text-2xl font-bold"
          >
            <GoArrowRight />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="carousel carousel-center space-x-4 p-4 overflow-x-auto w-full"
        onMouseEnter={() => setIsPaused(true)} // Pause on hover
        onMouseLeave={() => setIsPaused(false)} // Resume on mouse leave
      >
        {topCitiesData?.map((city) => (
          <div
            className="carousel-item rounded-box overflow-hidden w-[300px] h-[400px] relative flex-shrink-0"
            key={city.imgUrl}
          >
            {/* Image */}
            <img
              src={city.imgUrl}
              className=" w-full h-full object-cover"
              alt="img"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000cc] to-transparent"></div>

            {/* Text */}
            <div className="absolute bottom-4 left-4 text-white text-2xl font-medium">
              {city.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCities;
