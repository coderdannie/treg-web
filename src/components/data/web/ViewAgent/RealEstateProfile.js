import React, { useState } from 'react';
import { CiMail } from 'react-icons/ci';
import { BsTelephone } from 'react-icons/bs';
import { GoLink } from 'react-icons/go';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import AuthModal from '../../../modals/AuthModal';
import { useNavigate } from 'react-router-dom';

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}></div>
);

const RatingCategory = ({ name, value }) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }

  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-gray-600 font-medium">{name}</span>
      <div className="flex items-center">
        <div className="flex mr-2">{stars}</div>
        <span className="text-gray-700 font-medium">{value.toFixed(1)}</span>
      </div>
    </div>
  );
};

const RealEstateProfile = ({ data, isLoading, ratings, sales }) => {
  const user = !!sessionStorage.getItem('user');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const averageRating = ratings?.length
    ? ratings.reduce((sum, rating) => {
        return (
          sum +
          (rating.sociability +
            rating.responsiveness +
            rating.nonInterference +
            rating.experience) /
            4
        );
      }, 0) / ratings.length
    : 0;

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
                  <span>{sales} Sales</span>
                  <span>{averageRating.toFixed(1)}/5 rating</span>
                </div>
              </>
            )}
          </div>
          {isLoading ? (
            <div className="flex space-x-2 mt-4  mx-auto  md:mt-0 md:ml-auto">
              <Skeleton className="w-24 h-10" />
              <Skeleton className="w-32 h-10" />
            </div>
          ) : (
            <div className="flex space-x-2 mt-4  md:mt-0 md:ml-auto">
              <button
                className="btn btn-outline btn-primary flex items-center"
                onClick={() => {
                  if (user) {
                    navigate('/messages', {
                      state: { participantId: data?._id },
                    });
                    sessionStorage.setItem('participantId', data?._id);
                  } else {
                    setIsOpen(true);
                  }
                }}
              >
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

        {/* Ratings Section - Similar to Fiverr */}
        <div className="border-2 border-[#D4D0D0] rounded-md p-6">
          <h3 className="text-xl font-medium mb-6">Customer Reviews</h3>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          ) : ratings?.length ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Average Rating */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="text-4xl font-bold mr-4">
                    {averageRating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(averageRating) ? (
                            <FaStar className="text-yellow-400 text-xl" />
                          ) : i === Math.floor(averageRating) &&
                            averageRating % 1 >= 0.5 ? (
                            <FaStarHalfAlt className="text-yellow-400 text-xl" />
                          ) : (
                            <FaRegStar className="text-yellow-400 text-xl" />
                          )}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600">
                      Based on {ratings.length} review
                      {ratings.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating Categories */}
              <div className="space-y-4">
                <RatingCategory
                  name="Sociability"
                  value={
                    ratings.reduce((sum, r) => sum + r.sociability, 0) /
                    ratings.length
                  }
                />
                <RatingCategory
                  name="Responsiveness"
                  value={
                    ratings.reduce((sum, r) => sum + r.responsiveness, 0) /
                    ratings.length
                  }
                />
                <RatingCategory
                  name="Non-Interference"
                  value={
                    ratings.reduce((sum, r) => sum + r.nonInterference, 0) /
                    ratings.length
                  }
                />
                <RatingCategory
                  name="Experience"
                  value={
                    ratings.reduce((sum, r) => sum + r.experience, 0) /
                    ratings.length
                  }
                />
              </div>

              {/* Individual Reviews */}
              <div className="md:col-span-2 space-y-6">
                <h4 className="font-medium text-lg">Recent Feedback</h4>
                {ratings.map((rating, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="font-medium mr-2">
                        {rating.tenantId?.firstName} {rating.tenantId?.lastName}
                      </div>
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i <
                            Math.floor(
                              (rating.sociability +
                                rating.responsiveness +
                                rating.nonInterference +
                                rating.experience) /
                                4
                            ) ? (
                              <FaStar />
                            ) : (
                              <FaRegStar />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{rating.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet</p>
          )}
        </div>
      </div>
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default RealEstateProfile;
