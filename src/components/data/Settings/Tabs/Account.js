import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import Select from 'react-select';
import { IoIosArrowDown } from 'react-icons/io';
import FormInput from '../../../common/FormInput';

const Account = ({ user }) => {
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

  const handleSubmit = (values) => {
    console.log('Submitted values:', values);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Formik
          initialValues={{
            bankName: user.bankDetails?.bankName || '',
            accountNumber: user.bankDetails?.accountNumber || '',
            accountName: user.bankDetails?.accountName || '',
            password: '',
            newPassword: '',
            confirmPassword: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
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
                    { value: 'chase', label: 'Chase Bank' },
                    { value: 'boa', label: 'Bank of America' },
                    { value: 'wells', label: 'Wells Fargo' },
                  ]}
                  value={{
                    value: values.bankName.toLowerCase().replace(/\s+/g, ''),
                    label: values.bankName,
                  }}
                  onChange={(selected) =>
                    setFieldValue('bankName', selected.label)
                  }
                  placeholder="Select bank"
                />
              </div>

              <FormInput
                label="Account Number"
                name="accountNumber"
                type="text"
                placeholder="Enter account number"
                className="mb-4"
              />

              <FormInput
                label="Account Name"
                name="accountName"
                type="text"
                placeholder="Enter account name"
                className="mb-6"
              />

              <h5 className="text-md font-bold my-4">Change Password</h5>

              <FormInput
                label="Current Password"
                name="password"
                type="password"
                placeholder="Enter current password"
                className="mb-4"
              />

              <FormInput
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                className="mb-4"
              />

              <FormInput
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="mb-6"
              />

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary-dark transition"
              >
                Update Account
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};
export default Account;
