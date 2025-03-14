import { FaTemperatureThreeQuarters } from 'react-icons/fa6';

export const SkeletonCard = () => (
  <div className="w-full min-w-[257px] border border-[#E4E7EC] bg-white p-4 rounded-xl h-full">
    <div className="text-sm h-full">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
      <div className="flex items-center gap-4">
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="flex justify-center items-center border border-[#E4E7EC] rounded-full w-10 h-10 bg-gray-200 animate-pulse">
          <FaTemperatureThreeQuarters className="opacity-0" />
        </div>
      </div>
      <div className="flex items-center gap-2.5 mt-2">
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  </div>
);
