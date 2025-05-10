import { useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';

import { IoIosArrowDown } from 'react-icons/io';
import Select from 'react-select';
import FormInput from '../../components/common/FormInput';
import Loader from '../../components/Loaders/Loader';
import { useGetUser } from '../../services/query/account';

import { useNavigate } from 'react-router-dom';
import Account from '../../components/data/Settings/Tabs/Account';
import Personal from '../../components/data/Settings/Tabs/Personal';

const SettingsTab = () => {
  const { data: userData, isLoading: isLoadingUser } = useGetUser();
  const [activeTab, setActiveTab] = useState('personal');
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const user = userData?.data || {};

  // Custom styles for React Select to match your design
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

  // Dummy work experience data
  const initialWorkExperience = [
    {
      id: 1,
      company: 'Prime Properties',
      position: 'Senior Agent',
      duration: '2018 - Present',
    },
    {
      id: 2,
      company: 'Urban Living',
      position: 'Real Estate Agent',
      duration: '2015 - 2018',
    },
  ];

  const [workExperience, setWorkExperience] = useState(initialWorkExperience);

  const handleSubmit = (values) => {
    console.log('Submitted values:', values);
    setToastMessage('Settings updated successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        id: Date.now(),
        company: '',
        position: '',
        duration: '',
      },
    ]);
  };

  const removeWorkExperience = (id) => {
    setWorkExperience(workExperience.filter((exp) => exp.id !== id));
  };

  const updateWorkExperience = (id, field, value) => {
    setWorkExperience(
      workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  if (isLoadingUser) return <Loader />;

  return (
    <div className="min-h-screen">
      <div className="px-5 w-full grid place-items-center py-10 md:py-16">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 sm:p-8 rounded-3xl border-2 border-[#66666659] max-w-[800px] w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold">Settings</h4>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'personal'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('personal')}
            >
              Personal
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'account'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
            {user?.userType === 'Agent' && (
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === 'availability'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('availability')}
              >
                Availability
              </button>
            )}
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm"
            >
              {toastMessage}
            </motion.div>
          )}

          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <Personal
              user={user}
              handleSubmit={handleSubmit}
              removeWorkExperience={removeWorkExperience}
              updateWorkExperience={updateWorkExperience}
              addWorkExperience={addWorkExperience}
              workExperience={workExperience}
            />
          )}

          {/* Account Details Tab */}
          {activeTab === 'account' && <Account user={user} />}

          {/* Availability Tab */}
          {activeTab === 'availability' &&
            (user?.userType === 'Landlord' || user?.userType === 'Agent') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Formik
                  initialValues={{
                    workingDays: user.availability?.workingDays || [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                    ],
                    workingHours:
                      user.availability?.workingHours || '9am - 5pm',
                    contactHours:
                      user.availability?.contactHours || '10am - 4pm',
                  }}
                  onSubmit={handleSubmit}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Working Days
                        </label>
                        <div className="flex flex-wrap gap-2">
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
                              key={day}
                              type="button"
                              onClick={() => {
                                const newDays = values.workingDays.includes(day)
                                  ? values.workingDays.filter((d) => d !== day)
                                  : [...values.workingDays, day];
                                setFieldValue('workingDays', newDays);
                              }}
                              className={`px-4 py-2 rounded-md text-sm ${
                                values.workingDays.includes(day)
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Working Hours
                        </label>
                        <Select
                          styles={customStyles}
                          components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => (
                              <div>
                                <IoIosArrowDown className="h-3.5 w-3.5 text-[#646668]" />
                              </div>
                            ),
                          }}
                          options={[
                            { value: '9am - 5pm', label: '9am - 5pm' },
                            { value: '8am - 4pm', label: '8am - 4pm' },
                            { value: '10am - 6pm', label: '10am - 6pm' },
                            { value: 'Flexible', label: 'Flexible' },
                          ]}
                          value={{
                            value: values.workingHours,
                            label: values.workingHours,
                          }}
                          onChange={(selected) =>
                            setFieldValue('workingHours', selected.value)
                          }
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Hours
                        </label>
                        <Select
                          styles={customStyles}
                          components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => (
                              <div>
                                <IoIosArrowDown className="h-3.5 w-3.5 text-[#646668]" />
                              </div>
                            ),
                          }}
                          options={[
                            { value: '10am - 4pm', label: '10am - 4pm' },
                            { value: '9am - 5pm', label: '9am - 5pm' },
                            { value: '8am - 6pm', label: '8am - 6pm' },
                            { value: 'Anytime', label: 'Anytime' },
                          ]}
                          value={{
                            value: values.contactHours,
                            label: values.contactHours,
                          }}
                          onChange={(selected) =>
                            setFieldValue('contactHours', selected.value)
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary-dark transition"
                      >
                        Save Availability
                      </button>
                    </Form>
                  )}
                </Formik>
              </motion.div>
            )}
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsTab;
