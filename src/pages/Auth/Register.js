import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import vectorBg from '../../assets/vectorBg.png';
import { IoCloseSharp } from 'react-icons/io5';
import FormInput from '../../components/common/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import {
  initialRegisterValues,
  validateRegisterSchema,
} from '../../utils/Validation';
import { Form, Formik } from 'formik';

import { toast } from 'react-hot-toast';
import Banner from '../../components/common/Banner';
import { useSignUp } from '../../services/query/auth';

const Register = () => {
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const accType = sessionStorage.getItem('accType');
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const errorToast = (message) => toast.error(message, { duration: 3000 });

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/verify-otp');
    }
  }, [shouldNavigate, navigate]);

  const handleSubmit = (values) => {
    const { confirmPassword, ...rest } = values;
    mutate({
      ...rest,
      userType: accType,
    });
    sessionStorage.setItem('email', values.email);
  };

  const { mutate, isLoading } = useSignUp({
    onSuccess: (res) => {
      successToast(res?.message);
      setShouldNavigate(true);
      sessionStorage.setItem('passwordOtp', 'accountCreationOtp');
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || 'An Error occurred'
      );
    },
  });

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    const validations = {
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      specialChar: /[!@#\$%\^&]/.test(newPassword),
    };

    setPasswordValidations(validations);
  };

  return (
    <>
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
            className="bg-white p-4 sm:p-8 rounded-3xl border-2 border-[#66666659] max-w-[500px] w-full"
          >
            <div className="flex justify-end">
              <IoCloseSharp
                onClick={() => {
                  navigate(-1);
                }}
                className="cursor-pointer text-2xl"
              />
            </div>
            <h4 className="text-xl font-bold">Create an account</h4>
            <div className="grid mt-5 gap-2">
              {/* <button className="py-3 rounded-xl border-2 border-[#66666639]">
              Continue with Google
            </button> */}
              <Formik
                initialValues={initialRegisterValues}
                validationSchema={validateRegisterSchema}
                onSubmit={(values) => {
                  if (!isChecked) {
                    errorToast(
                      'You must agree to the terms and privacy policy.'
                    );
                    return;
                  }
                  handleSubmit(values);
                }}
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
                      label="First Name"
                      name="firstName"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && errors.firstName}
                      placeholder="Enter your first name"
                    />
                    <FormInput
                      label="Last Name"
                      name="lastName"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && errors.lastName}
                      placeholder="Enter your last name"
                    />
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
                      onChange={(e) => {
                        handlePasswordChange(e);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      error={touched.password && errors.password}
                      placeholder="Enter your password"
                    />
                    <FormInput
                      label="Confirm Password"
                      name="confirmPassword"
                      type="confirmPassword"
                      onChange={(e) => {
                        handlePasswordChange(e);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      error={touched.confirmPassword && errors.confirmPassword}
                      placeholder="Enter your confirm password"
                    />
                    <div>
                      <p className="text-sm mb-1 italic text-[#444]">
                        Password must contain at least
                      </p>
                      <div className="w-full text-sm gap-2">
                        <div className="flex gap-2">
                          <p
                            style={{
                              color: `${
                                passwordValidations.length
                                  ? '#2463EB'
                                  : !errors.password
                                  ? '#8e8e8e'
                                  : 'red'
                              }`,
                            }}
                          >
                            • 8 characters
                          </p>

                          <p
                            style={{
                              color: `${
                                passwordValidations.uppercase
                                  ? '#2463EB'
                                  : !errors.password
                                  ? '#8e8e8e'
                                  : 'red'
                              }`,
                            }}
                          >
                            • One uppercase
                          </p>
                          <p
                            style={{
                              color: `${
                                passwordValidations.specialChar
                                  ? '#2463EB'
                                  : !errors.password
                                  ? '#8e8e8e'
                                  : 'red'
                              }`,
                            }}
                          >
                            • One special case character
                          </p>
                        </div>
                        <div className="flex gap-2 mb-2">
                          <p
                            style={{
                              color: `${
                                passwordValidations.lowercase
                                  ? '#2463EB'
                                  : !errors.password
                                  ? '#8e8e8e'
                                  : 'red'
                              }`,
                            }}
                          >
                            • One lowercase
                          </p>
                          <p
                            style={{
                              color: `${
                                passwordValidations.number
                                  ? '#2463EB'
                                  : !errors.password
                                  ? '#8e8e8e'
                                  : 'red'
                              }`,
                            }}
                          >
                            • One number
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="checkbox-box"
                      />
                      <div className="text-sm">
                        By creating an account, I agree to our{' '}
                        <Link to="/terms" className="underline">
                          Terms of use
                        </Link>{' '}
                        and{' '}
                        <Link to="/terms" className="underline">
                          Privacy Policy
                        </Link>
                      </div>
                    </div>
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
                        'Create an account'
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
