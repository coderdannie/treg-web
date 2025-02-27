import { useState } from 'react';

import vectorBg from '../../assets/vectorBg.png';
import { IoCloseSharp } from 'react-icons/io5';
import FormInput from '../../components/common/FormInput';
import { useNavigate } from 'react-router-dom';
import { initPassValues, validatePword } from '../../utils/Validation';
import { Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import Banner from '../../components/common/Banner';
import { useChangePassword } from '../../services/query/auth';

const ResetPassword = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('email');

  const successToast = (message) => toast.success(message, { duration: 3000 });
  const errorToast = (message) => toast.error(message, { duration: 3000 });

  const { mutate, isLoading } = useChangePassword({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate('/login');
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || 'An Error occurred'
      );
    },
  });

  const handleSubmit = (values = '') => {
    mutate({
      email: email,
      password: values.password,
    });
  };

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
            Set a password
          </h4>
          <p>
            Your previous password has been reseted. Please set a new password
            for your account.
          </p>
          <Formik
            initialValues={initPassValues}
            validationSchema={validatePword}
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
                <div className="grid mt-5 gap-2">
                  <div className="mb-4 grid gap-2">
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
                      placeholder="*************"
                    />
                    <FormInput
                      label="Password"
                      name="confirmPassword"
                      type="password"
                      onBlur={handleBlur}
                      placeholder="*************"
                      value={values?.confirmPassword}
                      onChange={handleChange}
                      error={
                        touched?.confirmPassword && errors?.confirmPassword
                      }
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
                      'Submit'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
