import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import vectorBg from '../../assets/vectorBg.png';
import { IoCloseSharp } from 'react-icons/io5';
import Banner from '../../components/common/Banner';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useRateLandlordOrAgent } from '../../services/query/account';
import toast from 'react-hot-toast';

const Review = () => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const { id } = useParams();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({
    sociability: 0,
    responsiveness: 0,
    nonInterference: 0,
    experience: 0,
  });
  const [feedback, setFeedback] = useState(''); // State for textarea input

  const handleRatingChange = (category, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: rating,
    }));
  };

  const { mutate, isLoading } = useRateLandlordOrAgent({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate('/my-properties/all');
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const handleSubmit = () => {
    // Check if at least one rating is provided
    if (Object.values(ratings).every((rating) => rating === 0)) {
      errorToast('Please provide ratings in at least one category.');
      return;
    }

    // Prepare the payload
    const payload = {
      sociability: ratings.sociability,
      responsiveness: ratings.responsiveness,
      nonInterference: ratings.nonInterference,
      experience: ratings.experience,
      feedback: feedback,
    };

    // Send the payload to the API
    mutate({ id, data: payload });
  };

  // Memoize the renderStars function to avoid unnecessary re-renders
  const renderStars = useMemo(
    () => (category) => {
      return (
        <div className="flex">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <FaStar
                key={index}
                className="cursor-pointer"
                color={ratingValue <= ratings[category] ? '#ffc107' : '#e4e5e9'}
                size={20}
                onClick={() => handleRatingChange(category, ratingValue)}
              />
            );
          })}
        </div>
      );
    },
    [ratings] // Re-run only when ratings change
  );

  return (
    <div
      style={{
        backgroundImage: `url(${vectorBg})`,
        backgroundPosition: 'center center',
        fontFamily: 'Sansation',
      }}
    >
      <Banner />
      <div className="px-5 w-full grid place-items-center my-10 md:my-16 text-[#333333]">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#66666659] max-w-[500px] w-full"
        >
          <div className="flex justify-end">
            <IoCloseSharp
              onClick={() => navigate(-1)}
              className="cursor-pointer text-2xl"
            />
          </div>
          <div className="p-5 mt-4 border border-gray-300 rounded-md w-full">
            <h2 className="text-lg font-semibold mb-2">Rate Your Experience</h2>
            <p className="text-sm text-gray-600 mb-4">
              Rate and review your landlord and agent based on your experience
            </p>

            <h3 className="text-base font-medium mb-2">Rate your Landlord</h3>
            <p className="text-sm text-gray-600 mb-2">Categories to rate</p>

            <div className="mb-2 flex items-center justify-between flex-wrap gap-1">
              <label className="text-sm block">Sociability</label>
              {renderStars('sociability')}
            </div>

            <div className="mb-2 flex items-center justify-between flex-wrap gap-1">
              <label className="text-sm block">Responsiveness</label>
              {renderStars('responsiveness')}
            </div>

            <div className="mb-2 flex items-center justify-between flex-wrap gap-1">
              <label className="text-sm block">Non-Interference</label>
              {renderStars('nonInterference')}
            </div>

            <div className="mb-4 flex items-center justify-between flex-wrap gap-1">
              <label className="text-sm block">Experience</label>
              {renderStars('experience')}
            </div>

            <div>
              <label className="text-sm block mb-1">
                Share additional feedback
              </label>
              <textarea
                placeholder="Let's hear from you..."
                className="w-full p-2 border border-gray-300 rounded-md"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)} // Handle textarea input
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Review;
