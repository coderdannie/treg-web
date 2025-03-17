import React from 'react';

const WalletSkeleton = () => (
  <div className=" bg-gray-200 relative mt-[25px] mb-[27px] py-2 rounded-xl text-white overflow-hidden animate-pulse">
    <div className="max-w-[1077px] px-4 mx-auto w-full relative z-30">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-3 ">
        <div>
          <div className="pb-4 sm:pb-6">
            <div className="flex gap-6 items-center">
              <div className="h-4 bg-gray-200 rounded w-24"></div>{' '}
              {/* Available Balance Title */}
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>{' '}
              {/* Eye Icon Placeholder */}
            </div>
            <p className="text-left text-2xl font-medium">
              <div className="mt-2">
                <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
            </p>
          </div>
          <div>
            <div className="flex gap-6 items-center">
              <div className="h-4 bg-gray-200 rounded w-24"></div>{' '}
              {/* Escrow Balance Title */}
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>{' '}
              {/* Eye Icon Placeholder */}
            </div>
            <p className="text-left text-2xl font-medium">
              <div className="mt-2">
                <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
            </p>
          </div>
        </div>

        <div className="bg-white w-fit mt-2 sm:mt-0 text-primary flex rounded-lg gap-2 items-center py-3 px-5 font-semibold text-sm">
          <div className="h-5 w-5 bg-gray-200 rounded-full"></div>{' '}
          {/* Money Send Circle */}
          <div className="h-4 bg-gray-200 rounded w-16"></div>{' '}
          {/* Withdraw Text */}
        </div>
      </div>
    </div>
  </div>
);

export default WalletSkeleton;
