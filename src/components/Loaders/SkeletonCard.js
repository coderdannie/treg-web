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

export const PropertyItemSkeleton = () => {
  return (
    <li className="flex justify-between border p-[8.5px] border-[#D4D0D0] rounded-[11px] animate-pulse">
      <div className="flex gap-4">
        <div className="h-[66px] w-[80px] bg-gray-300 rounded-md overflow-hidden"></div>
        <div>
          <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="grid gap-1">
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
        <div className="h-3 w-20 bg-gray-300 rounded mt-1"></div>
      </div>
    </li>
  );
};

export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="mt-4 grid text-sm gap-2 font-medium">
        <p className="font-semibold text-base bg-gray-200 h-6 w-1/2 rounded"></p>
        <p className="text-gray-700 bg-gray-200 h-4 w-3/4 rounded"></p>
        <p className="text-gray-700 bg-gray-200 h-4 w-3/4 rounded"></p>
        <p className="text-gray-700 bg-gray-200 h-4 w-3/4 rounded"></p>
        <p className="text-gray-700 bg-gray-200 h-4 w-3/4 rounded"></p>
      </div>
      <div className="mt-4 border-t pt-4">
        <p3 className="text-md font-medium bg-gray-200 h-6 w-1/3 rounded"></p3>
        <p className="text-gray-700 bg-gray-200 h-4 w-3/4 rounded mt-2"></p>
        <p className="text-gray-700 bg-gray-200 h-4 w-3/4 rounded mt-2"></p>
      </div>
    </div>
  );
};
