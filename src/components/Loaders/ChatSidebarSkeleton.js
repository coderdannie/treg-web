import React from 'react';

const ChatSidebarSkeleton = () => {
  return (
    <div className="flex flex-col h-full animate-pulse">
      {/* Header skeleton */}
      <div className="p-4 flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Search bar skeleton */}
      <div className="p-4">
        <div className="w-full h-10 bg-gray-200 rounded-md"></div>
      </div>

      {/* Chat list skeletons */}
      <div className="flex-grow overflow-y-auto space-y-2 px-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex items-center p-4 rounded-lg bg-gray-100"
          >
            {/* Avatar skeleton */}
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>

            {/* Chat content skeleton */}
            <div className="flex-grow space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>

            {/* Timestamp/status skeleton */}
            <div className="flex flex-col items-end space-y-1">
              <div className="h-3 bg-gray-300 rounded w-8"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebarSkeleton;
