import React, { useRef, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

const PropertyCarousel = ({ data }) => {
  const mainRef = useRef(null);
  const thumbnailRef = useRef(null);

  const mainOptions = {
    type: 'fade',
    heightRatio: 0.5,
    pagination: false,
    arrows: false,
    cover: true,
  };

  const thumbnailOptions = {
    rewind: true,
    fixedWidth: 104,
    fixedHeight: 58,
    isNavigation: true,
    gap: 10,
    focus: 'center',
    pagination: false,
    cover: true,
    dragMinThreshold: {
      mouse: 4,
      touch: 10,
    },
    breakpoints: {
      640: {
        fixedWidth: 66,
        fixedHeight: 38,
      },
    },
  };

  // Sync the sliders after both are mounted
  useEffect(() => {
    if (mainRef.current && thumbnailRef.current) {
      const mainSplide = mainRef.current.splide;
      const thumbnailSplide = thumbnailRef.current.splide;

      if (mainSplide && thumbnailSplide) {
        mainSplide.sync(thumbnailSplide);
      }
    }
  }, []);

  return (
    <div className="carousel-container">
      {/* Main Slider */}
      <div className="main-slider relative">
        <Link
          className="flex items-center bg-[#181818A6] text-sm gap-3 text-white rounded-md p-2 w-fit absolute z-40 top-4 left-4
        "
          to={`/properties/property/virtual-tour/${1}`}
        >
          <img src="/assets/3-d-view.png" alt="3d view" />{' '}
          <span>Virtual Tour</span>
        </Link>
        <Splide
          options={mainOptions}
          ref={mainRef}
          aria-label="Property Images"
        >
          {data?.data?.photos?.map((image, i) => (
            <SplideSlide key={i}>
              <img src={image?.photoLink} alt={i} />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Thumbnail Slider */}
      <div className="thumbnail-slider">
        <Splide
          options={thumbnailOptions}
          ref={thumbnailRef}
          aria-label="Property Thumbnails"
        >
          {data?.data?.photos?.map((image, i) => (
            <SplideSlide key={i}>
              <img src={image?.photoLink} alt={i} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default PropertyCarousel;
