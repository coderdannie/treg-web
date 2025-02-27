import React, { useRef } from 'react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

const TopCities = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
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
            onClick={scrollLeft}
            className="top-0 grid place-items-center rounded-full right-0 bg-primary text-white w-10 h-10 md:w-12 md:h-12 translate-x-0 left-[-80px] md:left-[-0px] translate-y-0 text-2xl font-bold"
          >
            <GoArrowLeft />
          </button>

          <button
            onClick={scrollRight}
            className="top-0 grid place-items-center rounded-full right-0 bg-primary text-white w-10 h-10 md:w-12 md:h-12 translate-x-0 left-[-80px] md:left-[-0px] translate-y-0 text-2xl font-bold"
          >
            <GoArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="carousel carousel-center space-x-4 p-4 overflow-x-auto"
      >
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
            className="rounded-box"
            alt="img"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            className="rounded-box"
            alt="img"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
            className="rounded-box"
            alt="img"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
            className="rounded-box"
            alt="img"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
            className="rounded-box"
            alt="img"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
            className="rounded-box"
            alt="img"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
            className="rounded-box"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default TopCities;
