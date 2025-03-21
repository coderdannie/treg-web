import { useState, useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import FormInput from '../../components/common/FormInput';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import vectorBg from '../../assets/vectorBg.png';
import Banner from '../../components/common/Banner';
import {
  useResendAccountCreationOtp,
  useResendPasswordOtp,
  useVerifyEmail,
  useVerifyPasswordOtp,
} from '../../services/query/auth';

const VerifyOtp = () => {
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const errorToast = (message) => toast.error(message, { duration: 3000 });

  const [values, setValues] = useState({
    otp: '',
  });
  const email = sessionStorage.getItem('email');
  const passwordOtp = sessionStorage.getItem('passwordOtp');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const { mutate: mutatePasswordOtp, isLoading: isLoadingOtp } =
    useVerifyPasswordOtp({
      onSuccess: (res) => {
        navigate('/reset-password');
        sessionStorage.removeItem('passwordOt');
        successToast(res?.message);
      },
      onError: (err) => {
        errorToast(err.response.data.message || err.message);
      },
    });

  const { mutate, isLoading } = useVerifyEmail({
    onSuccess: (res) => {
      navigate('/login');
      sessionStorage.removeItem('email');
      successToast(res?.message);
    },
    onError: (err) => {
      errorToast(err.response.data.message || err.message);
    },
  });

  const {
    mutate: sendMutate,
    data,
    isLoading: isSending,
  } = useResendAccountCreationOtp({
    onSuccess: () => {
      successToast('An OTP has been sent to your email');
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occured'
      );
    },
  });
  const {
    mutate: resendMutate,
    data: resendData,
    isLoading: isReSending,
  } = useResendPasswordOtp({
    onSuccess: () => {
      successToast('An OTP has been sent to your email');
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occured'
      );
    },
  });
  const isFormValid = Object.values(values).every(
    (value) => value.trim() !== ''
  );

  const handleSubmit = () => {
    if (passwordOtp.includes('accountCreationOtp')) {
      mutate({
        email: email,
        otp: values?.otp,
      });
    } else {
      mutatePasswordOtp({
        email: email,
        otp: values?.otp,
      });
    }
  };

  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSend = () => {
    if (passwordOtp.includes('accountCreationOtp')) {
      sendMutate({
        email: email,
      });
    } else {
      resendMutate({
        email: email,
      });
    }
  };

  useEffect(() => {
    if (data || resendData) {
      setTimeLeft(120000);
    }
  }, [data, resendData]);

  return (
    <div
      style={{
        backgroundImage: `url(${vectorBg})`,
        backgroundPosition: 'center center',
        fontFamily: 'sansation',
      }}
      className="h-[100vh]"
    >
      <Banner />
      <div className="px-5 w-full grid place-items-center my-10 md:my-16">
        <div className="bg-white p-8 rounded-3xl border-2 border-[#66666659] max-w-[500px] w-full">
          <div className="flex justify-end">
            <IoCloseSharp
              onClick={() => {
                navigate(-1);
              }}
              className="cursor-pointer text-2xl"
            />
          </div>
          <h4 className="text-xl font-bold text-[#313131]">Verify code</h4>
          <p className="text-[#666666]">
            An authentication code has been sent to your email.
          </p>
          <div className="grid mt-5 gap-2">
            <FormInput
              label="Enter Code"
              name="otp"
              type="password"
              value={values.otp}
              onChange={handleChange}
              placeholder="Enter code"
            />

            <div>
              {isSending || isReSending ? (
                <span
                  className={
                    email
                      ? 'mt-1'
                      : 'border-t-transparent border-4 border-[#df1a1a] w-4 aspect-square rounded-full animate-spin mt-2'
                  }
                ></span>
              ) : (
                <div className={email ? 'mt-1' : 'mt-2 text-center'}>
                  <div className="flex items-center gap-1">
                    O.T.P will expire in
                    <p color={timeLeft < 30 ? 'red' : ''}>
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  </div>
                  <div className="flex text-sm mt-2 gap-2 mb-4">
                    Didn’t receive a code?{' '}
                    <button
                      className={
                        timeLeft === 0
                          ? 'cursor-pointer text-[#B71C1C] font-bold  hover:underline opacity-100 mt-1 text-sm'
                          : 'text-sm cursor-auto opacity-50 text-[#B71C1C] font-bold'
                      }
                      disabled={timeLeft !== 0}
                      fontWeight={500}
                      onClick={() => (timeLeft === 0 ? handleSend() : '')}
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn bg-primary text-white btn-block"
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              {isLoading || isLoadingOtp ? (
                <>
                  <span className="loading loading-spinner"></span>
                  sending...
                </>
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
