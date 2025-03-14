import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import vectorBg from '../../assets/vectorBg.png';
import { IoCloseSharp } from 'react-icons/io5';
import FormInput from '../../components/common/FormInput';
import { useNavigate } from 'react-router-dom';
import {
  initialKycValues,
  validateVerifyKycSchema,
} from '../../utils/Validation';
import { Form, Formik } from 'formik';

import { toast } from 'react-hot-toast';
import Banner from '../../components/common/Banner';
import { useDropzone } from 'react-dropzone';
import {
  useAddProfessionalDetails,
  useAddSupportingDocuments,
  useGetUser,
} from '../../services/query/account';
import Loader from '../../components/Loaders/Loader';
import TransactionPinModal from '../../components/modals/TransactionPin';

const UpdateKyc = () => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });
  const [isOpen, setIsOpen] = useState(false);

  const [step, setStep] = useState(1);
  const { data, isLoading: isLoadingUser } = useGetUser();

  useEffect(() => {
    if (data?.data?.professionalDetailsCompleted) {
      setStep(2);
    }
  }, [data, isLoadingUser]);

  const navigate = useNavigate();

  const [selectedDays, setSelectedDays] = useState(['Monday']);
  const [workingHours, setWorkingHours] = useState('8am - 4pm daily');
  const [file, setFile] = useState(null);

  console.log(selectedDays);
  console.log(file);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const { mutate, isLoading } = useAddProfessionalDetails({
    onSuccess: (res) => {
      successToast(res?.message);
      setStep(2);
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const { mutate: mutateDetails, isLoading: isSubmitting } =
    useAddSupportingDocuments({
      onSuccess: (res) => {
        successToast(res?.message);
        // navigate('/dashboard');
        setIsOpen(true);
      },
      onError: (res) => {
        errorToast(
          res?.response?.data?.message || res?.message || 'An Error Occurred'
        );
      },
    });

  const handleSubmit = (values) => {
    const phoneNumber = `+234${Number(values?.phoneNo)}`;
    mutate({
      agencyName: values.name,
      phone: phoneNumber,
      yearsOfExperience: Number(values.yearsOfExperience),
      serviceAreas: values.serviceArea,
      officeAddress: values.address,
    });
  };
  const handleAddSupportingDocs = () => {
    mutateDetails({
      avatar: file,
      daysAvailable: JSON.stringify(selectedDays),
      workingHours: workingHours,
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${vectorBg})`,
        backgroundPosition: 'center center',
        fontFamily: 'sansation',
      }}
    >
      {' '}
      <Banner />
      <div className="px-5 w-full grid place-items-center my-10 md:my-16">
        <motion.div
          initial={{ y: -50 }} // Start 50px above
          animate={{ y: 0 }} // End at normal position
          transition={{ duration: 0.5 }} // Animation duration
          className="bg-white p-4 sm:p-8 rounded-3xl border-2 border-[#66666659] max-w-[500px] w-full"
        >
          {' '}
          <div className="flex justify-end">
            <IoCloseSharp
              onClick={() => {
                if (step === 2 && !data?.data?.professionalDetailsCompleted) {
                  setStep(1);
                } else {
                  navigate(-1);
                }
              }}
              className="cursor-pointer text-2xl"
            />
          </div>
          <h4 className="text-xl font-bold">
            {step === 1 ? 'Professional Details' : 'Supporting Documents (KYC)'}
          </h4>
          {isLoadingUser ? (
            <Loader />
          ) : (
            <div className="grid mt-5 gap-2">
              <Formik
                initialValues={initialKycValues}
                validationSchema={validateVerifyKycSchema}
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
                    {step === 1 ? (
                      <div>
                        <FormInput
                          label="Agency Name (optional if independent)"
                          name="name"
                          type="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && errors.name}
                          placeholder="Enter your Agency name"
                        />
                        <FormInput
                          label="Phone number (required)"
                          name="phoneNo"
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*" // Allow only numbers
                          value={values.phoneNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phoneNo && errors.phoneNo}
                          placeholder="Enter your Phone number"
                        />
                        <FormInput
                          label="Years of Experience (required)"
                          name="yearsOfExperience"
                          type="number"
                          value={values.yearsOfExperience}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.yearsOfExperience &&
                            errors.yearsOfExperience
                          }
                          placeholder="Enter your years of experience"
                        />
                        <div className="flex flex-col">
                          <label className="pb-2">
                            Service Areas (required)
                          </label>
                          <textarea
                            value={values.serviceArea}
                            name="serviceArea"
                            onChange={handleChange}
                            maxLength={500}
                            placeholder="Enter property description..."
                            className="mt-1 p-3 border-2 border-gray-300 rounded-md focus:ring-0  focus:outline-none"
                            rows={4}
                            onBlur={handleBlur}
                            error={touched.serviceArea && errors.serviceArea}
                            style={{
                              borderColor: errors.serviceArea
                                ? 'red'
                                : values.serviceArea
                                ? '#1140E7'
                                : '',
                            }}
                          />

                          {errors.serviceArea && (
                            <div className="text-red-500 text-xs mt-1">
                              {errors.serviceArea}
                            </div>
                          )}
                        </div>
                        <FormInput
                          label="Office Address (required)"
                          name="address"
                          type="address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.address && errors.address}
                          placeholder="Enter your office address"
                        />

                        <button
                          type="submit"
                          className={`primary-btn w-full mt-8 h-[56px] ${
                            !values.address ||
                            !values.phoneNo ||
                            !values.serviceArea ||
                            !values.yearsOfExperience
                              ? '!bg-gray-300 !border-0'
                              : 'bg-primary'
                          }`}
                          disabled={
                            !values.address ||
                            !values.phoneNo ||
                            !values.serviceArea ||
                            !values.yearsOfExperience
                          }
                        >
                          {isLoading ? (
                            <span className="loading loading-dots loading-xs"></span>
                          ) : (
                            'Next'
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="p-2 md:p-4 max-w-lg mx-auto">
                        <label className="block text-gray-700 font-semibold mb-2">
                          Upload profile picture <i>(required, file upload)</i>
                        </label>
                        <div
                          {...getRootProps()}
                          className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer"
                        >
                          <input {...getInputProps()} />
                          {file ? (
                            <p>{file.name}</p>
                          ) : (
                            <p>
                              Drag and drop an image or{' '}
                              <span className="text-blue-600">browse</span>
                            </p>
                          )}
                        </div>

                        <h3 className="mt-6 text-lg font-semibold">
                          Availability Details
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">
                          Days available (required)
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                          {[
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                            'Sunday',
                          ].map((day) => (
                            <button
                              type="button"
                              key={day}
                              onClick={() => toggleDay(day)}
                              className={`px-4 py-2 rounded-md text-sm ${
                                selectedDays.includes(day)
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>

                        <p className="text-gray-500 text-sm mb-2">
                          Working hours (required)
                        </p>
                        <div className="flex gap-2">
                          {['8am - 4pm daily', '9am - 5pm daily'].map(
                            (hours) => (
                              <button
                                type="button"
                                key={hours}
                                onClick={() => setWorkingHours(hours)}
                                className={`px-4 py-2 rounded-md text-sm ${
                                  workingHours === hours
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {hours}
                              </button>
                            )
                          )}
                        </div>
                        <button
                          type="button"
                          className={`py-3 w-full rounded-xl text-white mt-4 ${
                            workingHours && selectedDays.length
                              ? 'bg-primary'
                              : 'bg-gray-300'
                          }`}
                          disabled={!workingHours || !selectedDays.length}
                          onClick={() => handleAddSupportingDocs()}
                        >
                          {isSubmitting ? (
                            <span className="loading loading-dots loading-xs"></span>
                          ) : (
                            'Continue'
                          )}
                        </button>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </motion.div>
      </div>
      <TransactionPinModal active={isOpen} setActive={setIsOpen} />
    </div>
  );
};
export default UpdateKyc;
