import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdCloseCircle } from 'react-icons/io';
import { useCreatePropertyPayment } from '../../services/query/payments';
import toast from 'react-hot-toast';
import FormInput from '../common/FormInput';

const EscrowModal = ({ isOpen, onClose, data }) => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const [duration, setDuration] = useState('');
  const rentalPeriod = data?.rentalPeriod;
  const cautionFee = parseFloat(data?.cautionFee?.$numberDecimal || '0');

  const { mutate, isLoading } = useCreatePropertyPayment({
    onSuccess: (res) => {
      successToast(res?.message);
      localStorage.setItem('paymentType', 'house-rent');
      const authUrl = res?.data?.data?.authorization_url;

      if (authUrl?.startsWith('http://') || authUrl?.startsWith('https://')) {
        window.location.replace(authUrl); // Redirects user immediately
      } else {
        errorToast('Invalid authorization URL received.');
      }
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const handleSubmit = () => {
    if (duration) {
      mutate({
        agentId: data?.agentId,
        propertyId: data?._id,
        rentDuration: Number(duration),
      });
    } else {
      errorToast('Please specify a duration before proceeding.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white mx-4 rounded-2xl p-6 w-full max-w-md relative text-center"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            {/* Header */}
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={onClose}
                className="text-gray-500 flex items-center gap-2"
              >
                <IoMdCloseCircle />
                Close
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center">
                <img src="/assets/markImg.png" alt="mark icon" />
              </div>
            </div>

            {/* Text Content */}
            <h2 className="text-xl font-semibold mb-4">
              Secure Your Rent with Escrow!
            </h2>
            <p className="text-gray-700 mb-4">
              Protect your money and ensure a smooth rental experience with TREG
              Escrow Services. Your funds stay safe until you get the keys{' '}
              <strong>—no scams, no stress!</strong>
            </p>

            {/* Rent Duration Type Display */}
            <div className="mb-4">
              <p className="text-gray-700">
                This property allows <strong>{rentalPeriod}</strong> payments.
              </p>
            </div>

            {/* Caution Fee Notification */}
            {cautionFee > 0 && (
              <div className="mb-4">
                <p className="text-gray-700">
                  A caution fee of{' '}
                  <strong>${cautionFee.toLocaleString()}</strong> applies.
                </p>
              </div>
            )}

            {/* Rent Duration Input */}
            <FormInput
              label={`Enter Rent Duration (in ${rentalPeriod})`}
              name="duration"
              value={duration}
              type="number"
              onChange={(e) => setDuration(e.target.value)}
              inputMode="decimal"
              pattern="[0-9.,]+"
              placeholder="1"
            />

            {/* Proceed to Payment Button */}
            <button
              className="w-full mt-3 secondary-btn py-3 hover:bg-primary hover:text-white"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : (
                'Proceed to Payment'
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EscrowModal;
