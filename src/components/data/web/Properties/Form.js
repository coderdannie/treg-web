import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import {
  contactAgentInitValues,
  validateContactSchema,
} from '../../../../utils/Validation';
import FormInput from '../../../common/FormInput';
import { FiCalendar } from 'react-icons/fi';
import { formatDate } from '../../../../utils/helper';
import Calendar from 'react-calendar';

const Contact = () => {
  const [isLoading] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.box') === null) {
        setShowStartDate(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSubmit = () => {};
  return (
    <section className="border-2 py-6  border-[#BDBDBD] px-[25px] min-991:py-[25px] rounded-2xl">
      <div className="grid mt-5 gap-2">
        <Formik
          initialValues={contactAgentInitValues}
          validationSchema={validateContactSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            setValues,
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
                label="Enter Phone number"
                name="phoneNo"
                type="Phone number"
                value={values.phoneNo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNo && errors.phoneNo}
                placeholder="Enter your Phone number"
              />
              {/* Start Date */}
              <div className="w-full box">
                <p className=" label-text pb-2">Desired move-in date</p>
                <div className=" w-full relative">
                  <div
                    className={`flex  gap-4 border-2  border-opacity-30 border-[#94A3B8] h-[46px] w-full rounded-[10px] cursor-pointer ${
                      values.date ? 'justify-between' : 'justify-end'
                    } items-center p-[10px]`}
                    onClick={() => setShowStartDate((prev) => !prev)}
                  >
                    <p className="text-xs text-[#292D32]">
                      {values.date || 'Pick date'}
                    </p>
                    <div>
                      <FiCalendar className="mr-2 h-4 w-4 text-[#5B5B5B]" />
                    </div>
                  </div>

                  {showStartDate && (
                    <div className="absolute max-w-[350px] bottom-[70px] w-full z-30">
                      <Calendar
                        onChange={(e) => {
                          setValues({
                            ...values,
                            date: formatDate(e),
                            issuedDate: formatDate(new Date()),
                          });
                          //   setShowDueDate(false);
                        }}
                        value={values?.date}
                        // tileDisabled={disableTile}
                        // tileClassName={tileClassName}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full mt-5">
                <textarea
                  name="details"
                  value={values.details}
                  onChange={handleChange}
                  className="textarea textarea-bordered border-2 w-full"
                  placeholder="Bio"
                ></textarea>
              </div>
              <button
                type="submit"
                className={`py-3 w-full rounded-xl text-white mt-6 ${
                  isValid && dirty ? 'bg-primary' : 'bg-gray-300'
                }`}
                disabled={!isValid || !dirty}
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  'Contact Agent'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default Contact;
