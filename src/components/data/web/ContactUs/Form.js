import { useEffect, useState } from 'react';
import {
  contactUsInitValues,
  validateContactUsSchema,
} from '../../../../utils/Validation';
import { Form, Formik } from 'formik';
import FormInput from '../../../common/FormInput';

const ContactForm = () => {
  const [isLoading] = useState();
  const handleSubmit = () => {};
  return (
    <div>
      <Formik
        initialValues={contactUsInitValues}
        validationSchema={validateContactUsSchema}
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
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
              </div>
              <div className="w-full">
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
              </div>
            </div>

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
            <div className="w-full mt-5">
              <label id="description" htmlFor="description">
                Message
              </label>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                className="textarea textarea-bordered border-2 w-full"
                placeholder="Let’s hear from you..."
              />
            </div>
            <button
              type="submit"
              className={`py-3 w-full mt-10 rounded-xl text-white  ${
                isValid && dirty ? 'bg-primary' : 'bg-gray-300'
              }`}
              disabled={!isValid || !dirty}
            >
              {isLoading ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : (
                'Send Message'
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ContactForm;
