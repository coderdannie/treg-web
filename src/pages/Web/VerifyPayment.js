import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Banner from '../../components/common/Banner';
import vectorBg from '../../assets/vectorBg.png';
import { motion } from 'framer-motion';
import {
  useVerifyPayment,
  useVerifyPropertyPayment,
} from '../../services/query/payments';
import toast from 'react-hot-toast';

const VerifyPayment = () => {
  const type = localStorage.getItem('paymentType');
  const [status, setStatus] = useState('pending'); // 'pending', 'success', 'failure'
  const [progress, setProgress] = useState(0);

  // Use useSearchParams to access query parameters
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference'); // Extract the 'reference' query parameter

  // Use useNavigate for navigation
  const navigate = useNavigate();

  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const { mutate } = useVerifyPayment({
    onSuccess: (res) => {
      successToast(res?.message);
      setStatus('success');
    },
    onError: (res) => {
      setStatus('failure');
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const { mutate: mutateVerify } = useVerifyPropertyPayment({
    onSuccess: (res) => {
      successToast(res?.message);
      setStatus('success');
    },
    onError: (res) => {
      setStatus('failure');
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : prev));
    }, 500);

    setTimeout(() => {
      clearInterval(interval);

      // Send the reference to the backend
      if (reference) {
        if (type.includes('house-rent')) {
          mutateVerify({ reference });
        } else {
          mutate({ reference });
        }
      } else {
        errorToast('Reference not found in URL');
        setStatus('failure');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [reference, mutate]); // Add reference and mutate to the dependency array

  return (
    <div
      style={{
        backgroundImage: `url(${vectorBg})`,
        backgroundPosition: 'center center',
        fontFamily: 'sansation',
      }}
    >
      <Banner />
      <div className="px-5 w-full grid place-items-center my-10 md:my-16">
        <motion.div
          initial={{ y: -50 }} // Start 50px above
          animate={{ y: 0 }} // End at normal position
          transition={{ duration: 0.5 }} // Animation duration
          className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md max-w-[562px] w-full p-[20px] md:p-[40px] border border-[#C2C2C2]"
        >
          <div>
            {/* <p className="text-gray-500 text-sm">TREG-2024-0012-RT-ALB-0003</p> */}
            {/* <p className="text-lg font-semibold">
              Pay <span className="text-green-600">NGN 576,900</span>
            </p> */}
            <h2 className="text-center text-lg md:text-2xl font-medium mt-4 text-[#363636]">
              We’re waiting to confirm your transfer. This can take a few
              minutes
            </h2>

            <div className="flex items-center justify-between w-full mt-4 px-6">
              <div className="flex items-center">
                <span
                  className={`w-4 h-4 rounded-full ${
                    status === 'success'
                      ? 'bg-green-500'
                      : 'border border-gray-400'
                  }`}
                ></span>
                <span className="ml-2 text-sm">Sent</span>
              </div>
              <motion.div
                className="h-1 bg-gray-300 w-40 rounded"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  backgroundColor:
                    status === 'success'
                      ? '#22c55e'
                      : status === 'failure'
                      ? '#ef4444'
                      : '#ccc',
                }}
              ></motion.div>
              <div className="flex items-center">
                <span
                  className={`w-4 h-4 rounded-full ${
                    status === 'pending'
                      ? 'border border-gray-400 animate-pulse'
                      : status === 'success'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                ></span>
                <span className="ml-2 text-sm">Received</span>
              </div>
            </div>

            <p className="text-gray-500 text-sm md:text-lg text-center mt-6">
              Please wait for some minutes while we confirm your transaction
            </p>
            <div className="flex items-center justify-center mt-4 text-gray-500 text-sm">
              <span className="mr-2">🔒</span>
              <span>
                Secured by <strong className="text-gray-900">paystack</strong>
              </span>
            </div>

            {/* Back Button */}
            {(status === 'success' || status === 'failure') && (
              <button
                className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
                onClick={() => {
                  if (type.includes('house-rent')) {
                    navigate('/my-properties/all');
                  } else {
                    navigate('/tenant/property');
                  }
                }}
              >
                Go Back
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyPayment;
