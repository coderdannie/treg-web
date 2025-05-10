import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';

import FormInput from '../../../common/FormInput';
import { IoCloseSharp } from 'react-icons/io5';

const Personal = ({
  user,
  handleSubmit,
  removeWorkExperience,
  updateWorkExperience,
  addWorkExperience,
  workExperience,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Formik
        initialValues={{
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
          bio: user.bio || '',
          profilePhoto: null,
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
                {values.profilePhoto ? (
                  <img
                    src={URL.createObjectURL(values.profilePhoto)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl text-gray-500">
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </span>
                )}
              </div>
              <label className="cursor-pointer text-primary font-medium text-sm">
                Upload Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue('profilePhoto', e.currentTarget.files[0])
                  }
                />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <FormInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Enter first name"
              />
              <FormInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Enter last name"
              />
            </div>

            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter email"
              disabled={true}
              className="mb-4"
            />

            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              className="mb-4"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={values.bio}
                onChange={(e) => {
                  const inputText = e.target.value;
                  const words = inputText.split(/\s+/).filter(Boolean);
                  if (words.length <= 300) {
                    setFieldValue('bio', e.target.value);
                  }
                }}
                placeholder="Tell us about yourself..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-primary"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                Word count: {values.bio.split(/\s+/).filter(Boolean).length}/300
              </p>
            </div>

            {/* Work Experience Section */}
            {user?.userType === 'Agent' && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Work Experience
                  </label>
                  <button
                    type="button"
                    onClick={addWorkExperience}
                    className="text-primary text-sm font-medium"
                  >
                    + Add Experience
                  </button>
                </div>

                {workExperience.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="mb-4 p-4 border border-gray-200 rounded-lg relative"
                  >
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeWorkExperience(exp.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <IoCloseSharp className="text-lg" />
                      </button>
                    )}
                    <FormInput
                      label="Company"
                      value={exp.company}
                      onChange={(e) =>
                        updateWorkExperience(exp.id, 'company', e.target.value)
                      }
                      className="mb-3"
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormInput
                        label="Position"
                        value={exp.position}
                        onChange={(e) =>
                          updateWorkExperience(
                            exp.id,
                            'position',
                            e.target.value
                          )
                        }
                      />
                      <FormInput
                        label="Duration"
                        value={exp.duration}
                        onChange={(e) =>
                          updateWorkExperience(
                            exp.id,
                            'duration',
                            e.target.value
                          )
                        }
                        placeholder="e.g. 2018 - Present"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary-dark transition"
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};
export default Personal;
