import React, { useRef, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const PropertyCarousel = () => {
  const mainRef = useRef(null);
  const thumbnailRef = useRef(null);

  const images = [
    { id: 1, src: '/assets/herobg1.jpg', alt: 'Property Image 1' },
    { id: 2, src: '/assets/herobg2.jpg', alt: 'Property Image 2' },
    { id: 3, src: '/assets/herobg3.jpg', alt: 'Property Image 3' },
    { id: 4, src: '/assets/herobg3.jpg', alt: 'Property Image 3' },
    { id: 5, src: '/assets/herobg3.jpg', alt: 'Property Image 3' },
  ];

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
      <div className="main-slider">
        <Splide
          options={mainOptions}
          ref={mainRef}
          aria-label="Property Images"
        >
          {images.map((image) => (
            <SplideSlide key={image.id}>
              <img src={image.src} alt={image.alt} />
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
          {images.map((image) => (
            <SplideSlide key={image.id}>
              <img src={image.src} alt={image.alt} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default PropertyCarousel;
