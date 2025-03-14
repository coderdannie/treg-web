import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import vectorBg from '../../assets/vectorBg.png';
import { IoCloseSharp } from 'react-icons/io5';
import FormInput from '../../components/common/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { initValues, validateSchema } from '../../utils/Validation';
import { toast } from 'react-hot-toast';
import Banner from '../../components/common/Banner';
import { useLogin } from '../../services/query/auth';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // const handleGoogleLogin = () => {
  //   // Redirect the browser to the Google OAuth URL
  //   window.location.href = 'https://ui-thrive-backend.onrender.com/auth/google';
  // };

  // const {
  //   data,
  //   mutate: authGoogleMutate,
  //   isLoading: isGoogleAuth,
  // } = useGetAuthGoogle();

  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(initValues);

  const errorToast = (message) => toast.error(message, { duration: 3000 });

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/');
    }
  }, [shouldNavigate, navigate]);

  const { mutate, isLoading } = useLogin({
    onSuccess: (res) => {
      sessionStorage.setItem('user', JSON.stringify(res));
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(res));
      }

      setShouldNavigate(true);
      navigate('/dashboard');
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  // Handle redirect back from Google OAuth with access token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');

    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken); // or localStorage
      navigate('/dashboard'); // Redirect to dashboard or desired route
    }
  }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setInitialValues({
        password: user.password || '',
      });
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (values = '') => {
    mutate(values);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

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
          <h4 className="text-xl font-bold">Sign in</h4>
          <div className="grid mt-5 gap-2">
            <Formik
              initialValues={initValues}
              validationSchema={validateSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                dirty,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                    placeholder="Enter your email"
                  />
                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                    placeholder="Enter your password"
                  />
                  <button
                    type="submit"
                    className={`py-3 w-full rounded-xl text-white mt-4 ${
                      isValid && dirty ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    disabled={!isValid || !dirty}
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                  <div className="flex items-center justify-between pt-4 gap-2 text-[#333333]">
                    <div className="flex gap-2 ">
                      <input
                        type="checkbox"
                        value={rememberMe}
                        onChange={handleRememberMeChange}
                        className="checkbox-box cursor-pointer"
                      />

                      <p>Remember me</p>
                    </div>
                    <div className="text-sm">
                      <Link to="/forgot-password" className="underline">
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                  <div className="flex text-sm gap-2 mb-2">
                    Don’t have an account?
                    <Link to="/create-account" className="hover:underline">
                      <span className="text-primary font-bold">Sign up</span>
                    </Link>
                  </div>
                  <div className="flex text-sm gap-2 mb-2 text-[#666666]">
                    This page is protected by Google reCAPTCHA <br /> to ensure
                    you're not a bot.
                    {/* <Link to="/register" className="hover:underline">
                      <span className="text-primary font-bold">Sign up</span>
                    </Link> */}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
