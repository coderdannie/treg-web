import { useState } from 'react';
import vectorBg from '../../assets/vectorBg.png';
import { IoCloseSharp } from 'react-icons/io5';
import FormInput from '../../components/common/FormInput';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Banner from '../../components/common/Banner';
import { useForgotPassword } from '../../services/query/auth';

const ForgotPassword = () => {
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const errorToast = (message) => toast.error(message, { duration: 3000 });

  const [values, setValues] = useState({
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const { mutate, isLoading } = useForgotPassword({
    onSuccess: (res) => {
      navigate('/verify-otp');
      successToast(res?.message);
      sessionStorage.setItem('email', values?.email);
      sessionStorage.setItem('passwordOtp', 'passwordOtp');
    },
    onError: (err) => {
      errorToast(err.response.data.message || err.message);
    },
  });

  const handleSubmit = () => {
    mutate({
      email: values?.email,
    });
  };

  const isFormValid = Object.values(values).every(
    (value) => value.trim() !== ''
  );

  return (
    <div
      style={{
        backgroundImage: `url(${vectorBg})`,
        backgroundPosition: 'center center',
        fontFamily: 'Sansation',
      }}
      className="h-[100vh]"
    >
      <Banner />
      <div className="px-5 w-full grid place-items-center my-10 md:my-16">
        <div className="bg-white p-8 pb-10 rounded-3xl border-2 border-[#66666659] max-w-[500px] w-full">
          <div className="flex justify-end">
            <IoCloseSharp
              onClick={() => {
                navigate(-1);
              }}
              className="cursor-pointer text-2xl"
            />
          </div>
          <h4 className="text-xl pb-3 font-bold text-[#313131]">
            Forgot your password?
          </h4>
          <p className="text-[#666666]">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </p>
          <div className="grid mt-5 gap-2">
            <div className="mb-4">
              <FormInput
                label="Enter Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="yourmail@gmail.com"
              />
            </div>

            <button
              type="submit"
              className="btn bg-primary text-white btn-block"
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  sending...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
