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
import CreateTransactionPinModal from '../../components/modals/CreateTransactionPinModal';
import {
  useAddAccountDetails,
  useGetBanks,
  useResolveName,
} from '../../services/query/payments';
import Select from 'react-select';
import { IoIosArrowDown } from 'react-icons/io';
import { realEstateRoles } from '../../components/common/constants';

const UpdateKyc = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });
  const [isOpen, setIsOpen] = useState(false);
  const [accValues, setAccValues] = useState({
    beneficiaryAccountName: '',
    bankCode: '',
    beneficiaryBankName: '',
    beneficiaryAccountNumber: '',
  });
  const [step, setStep] = useState(1);
  const { data, isLoading: isLoadingUser } = useGetUser();
  const { data: banks, isLoading: isGetting } = useGetBanks();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingUser || !data?.data) return; // Early return if loading or no data

    const userData = data?.data;

    if (!userData.professionalDetailsCompleted) {
      setStep(1);
    } else if (!userData.hasBankAccount) {
      setStep(2);
    } else if (!userData.supportingDocumentProvided) {
      setStep(3);
    } else if (!userData.isPinSet) {
      setIsOpen(true);
    } else {
      navigate('/dashboard');
    }
  }, [data, isLoadingUser, navigate]);

  const [selectedDays, setSelectedDays] = useState(['Monday']);
  const [workingHours, setWorkingHours] = useState('8am - 4pm daily');
  const [file, setFile] = useState(null);
  const [agreementFile, setAgreementFile] = useState(null);
  const [err, setErr] = useState('');

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      minHeight: '50px',
      color: state.hasValue ? '#444' : '#B4B4B4',
      fontSize: '14px',
      cursor: 'pointer',
      borderRadius: '10px',
      border: state.hasValue ? '1px solid #DCE7FF' : '1px solid #D2D2D2',
      paddingRight: '16px',
      background: state.hasValue ? '#F3F7FF' : 'unset',
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: '13px',
      backgroundColor: '#fff',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '' : '',
      backgroundColor: state.isFocused ? '#f4f6f8' : '',
    }),
  };
  const bankOptions = banks?.data?.map((data) => ({
    value: data.code,
    label: data.name,
  }));
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };
  const onDropAgreement = (acceptedFiles) => {
    setAgreementFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const {
    getRootProps: getAgreementRootProps,
    getInputProps: getAgreementInputProps,
  } = useDropzone({
    onDrop: onDropAgreement,
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

  const { mutate: mutateAddAcc, isLoading: isAdding } = useAddAccountDetails({
    onSuccess: (res) => {
      successToast(res?.message);
      setStep(3);
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
        setIsOpen(true);
      },
      onError: (res) => {
        errorToast(
          res?.response?.data?.message || res?.message || 'An Error Occurred'
        );
      },
    });
  const {
    mutate: mutateResolveName,
    data: accName,
    isLoading: isName,
  } = useResolveName({
    onSuccess: (res) => {
      setErr('');
      setAccValues({
        ...accValues,
        beneficiaryAccountName: res?.data?.account_name,
      });
    },
    onError: (err) => {
      setErr(err?.response?.data?.error || 'Network Error');
    },
  });
  useEffect(() => {
    if (
      accValues?.bankCode &&
      accValues?.beneficiaryAccountNumber?.length === 10
    ) {
      mutateResolveName({
        accountNumber: accValues?.beneficiaryAccountNumber,
        bankCode: accValues?.bankCode,
      });
    }
  }, [
    accValues.beneficiaryAccountNumber,
    accValues?.bankCode,
    mutateResolveName,
  ]);
  const handleSubmit = (values) => {
    const phoneNumber = `+234${Number(values?.phoneNo)}`;
    mutate({
      agencyName: values.name,
      phone: phoneNumber,
      yearsOfExperience: Number(values.yearsOfExperience),
      serviceAreas: values.serviceArea,
      officeAddress: values.address,
      agentType: values.agencyType,
      bio: values?.bio,
    });
  };
  const handleAddSupportingDocs = () => {
    mutateDetails({
      avatar: file,
      daysAvailable: JSON.stringify(selectedDays),
      workingHours: workingHours,
      tenancyAgreement: agreementFile,
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
                navigate(-1);
              }}
              className="cursor-pointer text-2xl"
            />
          </div>
          <h4 className="text-xl font-bold">
            {step === 1
              ? 'Professional Details'
              : step === 2
              ? 'Account Details'
              : 'Supporting Documents (KYC)'}
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
                  setValues,
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
                        {user?.data?.userType === 'Agent' && (
                          <div className="w-full relative mb-2">
                            <p className="text-[#444] font-semibold mb-2 text-sm">
                              Real Estate Roles
                            </p>
                            <Select
                              styles={customStyles}
                              components={{
                                IndicatorSeparator: () => (
                                  <div style={{ display: 'none' }}></div>
                                ),
                                DropdownIndicator: () => (
                                  <div>
                                    <IoIosArrowDown className="h-3.5 w-3.5 text-[#646668]" />
                                  </div>
                                ),
                              }}
                              onChange={(selectedOption) => {
                                setValues((prevValues) => ({
                                  ...prevValues,
                                  agencyType: selectedOption?.value,
                                }));
                              }}
                              placeholder="Select Role"
                              value={realEstateRoles.find(
                                (option) => option.value === values.agencyType
                              )}
                              options={realEstateRoles}
                            />
                          </div>
                        )}
                        {user?.data?.userType && (
                          <div className="flex flex-col mb-2">
                            <label className="pb-2">Enter Bio (required)</label>
                            <textarea
                              value={values.bio}
                              name="bio"
                              onChange={(e) => {
                                const inputText = e.target.value;
                                const words = inputText
                                  .split(/\s+/)
                                  .filter(Boolean);

                                if (words.length <= 300) {
                                  handleChange(e);
                                }
                              }}
                              // maxLength={500}
                              placeholder="Enter Bio."
                              className="mt-1 p-3 border-2 border-gray-300 rounded-md focus:ring-0 focus:outline-none"
                              rows={4}
                              onBlur={handleBlur}
                              style={{
                                borderColor: errors.bio
                                  ? 'red'
                                  : values.bio
                                  ? '#1140E7'
                                  : '',
                              }}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              Word count:{' '}
                              {values.bio.split(/\s+/).filter(Boolean).length}
                              /300
                            </p>
                          </div>
                        )}
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
                            !values.yearsOfExperience ||
                            (user?.data?.userType === 'Agent' &&
                              (!values.bio || !values.agencyType))
                              ? '!bg-gray-300 !border-0 pointer-events-none '
                              : 'bg-primary'
                          }`}
                          disabled={
                            !values.address ||
                            !values.phoneNo ||
                            !values.serviceArea ||
                            !values.yearsOfExperience ||
                            (user?.data?.userType === 'Agent' &&
                              (!values.bio || !values.agencyType))
                          }
                        >
                          {isLoading ? (
                            <span className="loading loading-dots loading-xs"></span>
                          ) : (
                            'Next'
                          )}
                        </button>
                      </div>
                    ) : step === 2 ? (
                      <div>
                        <div className="w-full relative">
                          <p className="text-[#444] text-base md:text-md font-medium mb-2">
                            Select Bank
                          </p>
                          <Select
                            styles={customStyles}
                            isDisabled={isGetting}
                            components={{
                              IndicatorSeparator: () => (
                                <div style={{ display: 'none' }}></div>
                              ),
                              DropdownIndicator: () =>
                                isGetting ? (
                                  <div className="h-4  loading loading-dots loading-xs" /> // Adjust spinner size
                                ) : (
                                  <div>
                                    <IoIosArrowDown className="h-3.5 w-3.5 text-[#646668]" />
                                  </div>
                                ),
                            }}
                            onChange={(selectedOption) => {
                              setAccValues((prevValues) => ({
                                ...prevValues,
                                bankCode: selectedOption.value,
                                beneficiaryBankName: selectedOption.label,
                              }));
                            }}
                            placeholder="Select Account"
                            value={bankOptions?.find(
                              (option) =>
                                option?.label === accValues?.beneficiaryBankName
                            )}
                            options={bankOptions}
                          />
                        </div>
                        <div className="w-full pt-5">
                          <FormInput
                            value={accValues?.beneficiaryAccountNumber}
                            name="beneficiaryAccountNumber"
                            label="Account Number"
                            type="tel"
                            inputMode="decimal"
                            pattern="[0-9.,]+"
                            placeholder="Enter Account Number"
                            onChange={(e) => {
                              const inputPhone = e.target.value
                                .replace(/\D/g, '')
                                .slice(0, 10);
                              setAccValues({
                                ...accValues,
                                beneficiaryAccountNumber: inputPhone,
                              });
                            }}
                          />
                          <div
                            className={`mt-2 ${
                              isName || err || accName ? '' : 'hidden'
                            }`}
                          >
                            {isName ? (
                              <div className="loading loading-dots loading-xs border-[#E7F2FF] " /> // Adjust spinner size
                            ) : (
                              <p
                                className={`text-sm font-medium ${
                                  err ? 'text-red-500' : 'text-[#444]'
                                }`}
                              >
                                {err || accValues?.beneficiaryAccountName || ''}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          className={`py-3 w-full rounded-xl text-white mt-4 ${
                            isName || accValues.beneficiaryAccountName
                              ? 'bg-primary'
                              : 'bg-gray-300'
                          }`}
                          isDisabled={
                            isName || accValues.beneficiaryAccountName || err
                          }
                          onClick={() =>
                            mutateAddAcc({
                              accountNumber:
                                accValues?.beneficiaryAccountNumber,
                              accountName: accValues?.beneficiaryAccountName,
                              bankName: accValues?.beneficiaryBankName,
                              bankCode: accValues?.bankCode,
                            })
                          }
                        >
                          {isAdding ? (
                            <span className="loading loading-dots loading-xs"></span>
                          ) : (
                            'Continue'
                          )}
                        </button>
                      </div>
                    ) : step === 3 ? (
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Upload profile picture <i>(required)</i>
                        </label>
                        <div
                          {...getRootProps()}
                          className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer mb-4"
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

                        <label className="block text-gray-700 font-semibold mb-2">
                          Upload Tenancy Agreement <i>(optional)</i>
                        </label>
                        <div
                          {...getAgreementRootProps()}
                          className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer mb-4"
                        >
                          <input {...getAgreementInputProps()} />
                          {agreementFile ? (
                            <p>{agreementFile.name}</p>
                          ) : (
                            <p>
                              Drag and drop a document or{' '}
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
                    ) : null}
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </motion.div>
      </div>
      <CreateTransactionPinModal
        active={isOpen}
        setActive={setIsOpen}
        userData={data?.data}
      />
    </div>
  );
};

export default UpdateKyc;
