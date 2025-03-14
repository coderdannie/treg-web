import React from 'react';

const PropertyCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-48 bg-gray-200"></div> {/* Image placeholder */}
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>{' '}
        {/* Title placeholder */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>{' '}
        {/* Subtitle placeholder */}
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>{' '}
        {/* Price placeholder */}
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>{' '}
        {/* Location placeholder */}
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
