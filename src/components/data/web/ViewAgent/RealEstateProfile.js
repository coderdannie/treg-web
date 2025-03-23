import React from 'react';
import { CiMail } from 'react-icons/ci';
import { BsTelephone } from 'react-icons/bs';
import { GoLink } from 'react-icons/go';

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}></div>
);

const RealEstateProfile = ({ data, isLoading }) => {
  return (
    <div className="mx-auto">
      <div className="grid gap-7 rounded-lg space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-4 py-8 pl-2 md:pl-5 pr-7 border-2 border-[#D4D0D0] rounded-md shadow-md">
          {isLoading ? (
            <Skeleton className="w-24 h-24 rounded-full" />
          ) : (
            <img
              src={data?.avatar}
              alt={data?.firstName}
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div className="text-center md:text-left">
            {isLoading ? (
              <>
                <Skeleton className="w-48 h-6 mb-2" />
                <Skeleton className="w-32 h-4 mb-6" />
                <div className="flex justify-center md:justify-start space-x-4">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl md:text-2xl font-medium text-[#424242]">
                  {data?.lastName} {data?.firstName}
                </h2>
                <p className="text-[#787878] md:text-lg">Real Estate Agent</p>
                <div className="flex justify-center md:justify-start space-x-4 text-sm text-gray-500 font-medium mt-6">
                  <span>
                    {data?.professionalDetails?.yearsOfExperience || 'N/A'}{' '}
                    Years Experience
                  </span>
                  <span>12 Sales</span>
                  <span>4.8/5 rating</span>
                </div>
              </>
            )}
          </div>
          {isLoading ? (
            <div className="flex space-x-2 mt-4 md:mt-0 ml-auto">
              <Skeleton className="w-24 h-10" />
              <Skeleton className="w-32 h-10" />
            </div>
          ) : (
            <div className="flex space-x-2 mt-4 md:mt-0 ml-auto">
              <button className="btn btn-outline btn-primary flex items-center">
                <CiMail /> Message
              </button>
              <button className="primary-btn flex items-center gap-1">
                <BsTelephone />
                Request a Call
              </button>
            </div>
          )}
        </div>

        {/* About Ola */}
        <div className="flex flex-col md:flex-row gap-7">
          <div className="border-2 border-[#D4D0D0] rounded-md md:flex-[1.4]">
            <h3 className="pt-[23px] pb-4 pl-7 border-b-2 border-[#D4D0D0]">
              About {data?.firstName ?? '--'}
            </h3>
            {isLoading ? (
              <div className="px-7 pt-[29px] pb-10">
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            ) : (
              <p className="text-[#757575] text-sm md:text-base px-7 pt-[29px] pb-10">
                {data?.professionalDetails?.bio ?? '--'}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div className="border-2 text-[#757575] border-[#D4D0D0] rounded-md md:flex-1">
            <h3 className="pt-[23px] pb-4 pl-7 border-b-2 border-[#D4D0D0]">
              Contact Information
            </h3>
            {isLoading ? (
              <div className="px-7 pt-[29px] pb-10">
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
            ) : (
              <div className="grid gap-1 px-7 pt-[29px] pb-10 text-sm md:text-base">
                <p>📞 Phone: (234) {Number(data?.phone.slice(4)) ?? 'N/A'}</p>
                <p>✉️ Email: {data?.email ?? 'N/A'}</p>
                <p>
                  📍 Office Address: {data?.professionalDetails?.officeAddress}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col md:flex-row gap-7">
          <div className="border-2 border-[#D4D0D0] rounded-md md:flex-[1]">
            <h3 className="pt-[23px] pb-4 pl-7 border-b-2 border-[#D4D0D0]">
              Profile Details
            </h3>
            {isLoading ? (
              <div className="px-7 pt-[29px] pb-10">
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
            ) : (
              <div className="text-[#757575] grid gap-1 text-sm md:text-base px-7 pt-[29px] pb-10">
                <p>
                  <strong className="font-medium">Specialization:</strong>{' '}
                  Luxury residential properties, high-rise apartments
                </p>
                <p>
                  <strong className="font-medium">Agency Affiliation:</strong>{' '}
                  UrbanNest Realty
                </p>
                <p>
                  <strong className="font-medium">Service Areas:</strong>{' '}
                  {data?.professionalDetails?.serviceAreas}
                </p>
                <p>
                  <strong className="font-medium">License Number:</strong>{' '}
                  TREG202487
                </p>
              </div>
            )}
          </div>

          {/* Client Testimonials */}
          <div className="border-2 text-[#757575] border-[#D4D0D0] rounded-md md:flex-[1.4]">
            <h3 className="pt-[23px] pb-4 pl-7 border-b-2 border-[#D4D0D0]">
              Client Testimonials
            </h3>
            {isLoading ? (
              <div className="px-7 pt-[29px] pb-10">
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
            ) : (
              <div className="grid gap-1 px-7 pt-[29px] pb-10 text-sm md:text-base">
                <p>
                  "Working with Ola was a seamless experience! He was always
                  available to answer my questions and found a place that
                  checked every box on my list." – Jennifer K.
                </p>
                <p>
                  "Ola’s knowledge of the market and his dedication to his
                  clients are unmatched. I couldn’t have asked for a better
                  experience!" – Michael S.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Collaborate with Ola */}
        <div className="flex flex-col md:flex-row gap-7">
          <div className="border-2 border-[#D4D0D0] rounded-md md:flex-[1.4]">
            <h3 className="pt-[23px] pb-4 pl-7 border-b-2 border-[#D4D0D0]">
              Collaborate with Ola
            </h3>
            {isLoading ? (
              <div className="px-7 pt-[29px] pb-4">
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            ) : (
              <>
                <p className="text-[#757575] text-sm md:text-base px-7 pt-[29px] pb-4">
                  Ola believes in the power of collaboration to enhance the
                  client experience. If you're an agent interested in partnering
                  on a listing or co-marketing a property, click the
                  “Collaborate with Ola” button to start the conversation. Ola
                  is open to mutually beneficial partnerships that enhance
                  service offerings for both agents and clients.
                </p>
                <button className="primary-btn ml-auto flex gap-1 mb-2 mr-4">
                  <GoLink />
                  Collaborate with Ola
                </button>
              </>
            )}
          </div>

          {/* Availability */}
          <div className="border-2 text-[#757575] border-[#D4D0D0] rounded-md md:flex-1">
            <h3 className="pt-[23px] pb-4 pl-7 border-b-2 border-[#D4D0D0]">
              Availability
            </h3>
            {isLoading ? (
              <div className="px-7 pt-[29px] pb-10">
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
            ) : (
              <div className="grid gap-1 px-7 pt-[29px] pb-10 text-sm md:text-base">
                {/* Render working hours */}
                <p>
                  <strong>Working Hours:</strong>{' '}
                  {data?.supportingDocument?.workingHours ?? 'N/A'}
                </p>

                {/* Render days available */}
                <p>
                  <strong>Days Available:</strong>{' '}
                  {data?.supportingDocument?.daysAvailable
                    ? JSON.parse(
                        data?.supportingDocument?.daysAvailable[0]
                      ).join(', ')
                    : 'N/A'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateProfile;
