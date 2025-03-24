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
  // Toast helpers
  const showError = (message) => toast.error(message, { duration: 3000 });
  const showSuccess = (message) => toast.success(message, { duration: 3000 });

  const { id } = useParams();
  const navigate = useNavigate();

  // State management
  const [ratings, setRatings] = useState({
    sociability: 0,
    responsiveness: 0,
    nonInterference: 0,
    experience: 0,
  });
  const [feedback, setFeedback] = useState('');
  const [hoveredRating, setHoveredRating] = useState({
    category: null,
    value: 0,
  });

  // Check if at least one rating is provided
  const hasRatings = Object.values(ratings).some((rating) => rating > 0);

  // Rating change handler
  const handleRatingChange = (category, rating) => {
    setRatings((prev) => ({ ...prev, [category]: rating }));
  };

  // Hover handlers for better UX
  const handleMouseEnter = (category, value) => {
    setHoveredRating({ category, value });
  };

  const handleMouseLeave = () => {
    setHoveredRating({ category: null, value: 0 });
  };

  // API mutation
  const { mutate, isLoading } = useRateLandlordOrAgent({
    onSuccess: (res) => {
      showSuccess(res?.message);
      navigate('/tenant/property');
    },
    onError: (err) => {
      showError(
        err?.response?.data?.message || err?.message || 'An Error Occurred'
      );
    },
  });

  // Form submission
  const handleSubmit = () => {
    if (!hasRatings) {
      showError('Please provide at least one rating');
      return;
    }

    mutate({
      id,
      data: { ...ratings, feedback },
    });
  };

  // Memoized star renderer with hover effects
  const renderStars = useMemo(
    () => (category) => {
      return (
        <div className="flex">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            const isHovered =
              hoveredRating.category === category &&
              ratingValue <= hoveredRating.value;
            const isActive = ratingValue <= ratings[category];

            return (
              <FaStar
                key={index}
                className="cursor-pointer transition-colors"
                color={isHovered ? '#ffc107' : isActive ? '#ffc107' : '#e4e5e9'}
                size={20}
                onClick={() => handleRatingChange(category, ratingValue)}
                onMouseEnter={() => handleMouseEnter(category, ratingValue)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
      );
    },
    [ratings, hoveredRating]
  );

  return (
    <div
      style={{
        backgroundImage: `url(${vectorBg})`,
        backgroundPosition: 'center center',
      }}
    >
      <Banner />
      <div className="px-5 w-full grid place-items-center my-10 md:my-16">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 md:p-8 rounded-3xl border-2 border-gray-200 max-w-[500px] w-full"
        >
          <div className="flex justify-end">
            <IoCloseSharp
              onClick={() => navigate(-1)}
              className="cursor-pointer text-2xl hover:text-primary"
            />
          </div>

          <div className="p-5 mt-4 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Rate Your Experience</h2>
            <p className="text-sm text-gray-600 mb-4">
              Rate and review your landlord and agent based on your experience
            </p>

            <p className="text-sm text-gray-600 font-medium mb-2">
              Categories to rate
            </p>

            {/* Rating Categories */}
            {Object.entries({
              sociability: 'Sociability',
              responsiveness: 'Responsiveness',
              nonInterference: 'Non-Interference',
              experience: 'Experience',
            }).map(([key, label]) => (
              <div key={key} className="mb-3 flex items-center justify-between">
                <label className="text-sm">{label}</label>
                {renderStars(key)}
              </div>
            ))}

            {/* Feedback Textarea */}
            <div className="mt-4">
              <label className="text-sm block mb-1">
                Share additional feedback (optional)
              </label>
              <textarea
                placeholder="Let's hear from you..."
                className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!hasRatings || isLoading}
              className={`mt-4 w-full text-white py-2 rounded-md transition-colors ${
                !hasRatings
                  ? 'bg-gray-300 cursor-not-allowed'
                  : isLoading
                  ? 'bg-blue-400'
                  : 'bg-primary hover:bg-blue-600'
              }`}
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
