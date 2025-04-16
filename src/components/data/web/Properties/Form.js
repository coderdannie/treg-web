import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import {
  contactAgentInitValues,
  validateContactSchema,
} from '../../../../utils/Validation';
import { FiCalendar } from 'react-icons/fi';
import { formatBackendDate, formatDate } from '../../../../utils/helper';
import Calendar from 'react-calendar';
import { FaCalendarAlt } from 'react-icons/fa';
import { useSendEnquiryRequest } from '../../../../services/query/properties';
import toast from 'react-hot-toast';
import AuthModal from '../../../modals/AuthModal';

const Contact = ({ data }) => {
  console.log(data);
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const [showStartDate, setShowStartDate] = useState(false);
  const [showTourCalendar, setShowTourCalendar] = useState(false);
  const [selectedTourDates, setSelectedTourDates] = useState([]);
  const [tourDate, setTourDate] = useState(null);

  const [isOpen, setIsOpen] = useState();

  const user = !!sessionStorage.getItem('user');

  const { mutate, isLoading } = useSendEnquiryRequest({
    onSuccess: (res) => {
      successToast(res?.message);
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.box') === null) {
        setShowStartDate(false);
        setShowTourCalendar(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleTourDateSelect = (date) => {
    const formattedDate = formatBackendDate(date);

    if (selectedTourDates.includes(formattedDate)) {
      setSelectedTourDates(
        selectedTourDates.filter((d) => d !== formattedDate)
      );
    } else {
      if (selectedTourDates.length < 3) {
        setSelectedTourDates([...selectedTourDates, formattedDate]);
      }
    }
    setShowTourCalendar(false);
  };
  console.log(selectedTourDates);

  const handleSubmit = (values) => {
    if (user) {
      mutate({
        message: values.details,
        propertyId: data?.photos[0]?.propertyId,
        tourDates: selectedTourDates,
        moveInDate: formatBackendDate(values?.date),
        agentId: data?.agentId?._id,
      });
    } else {
      setIsOpen(true);
    }
  };

  const tileDisabled = ({ date }) => {
    // Disable past dates
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  const maxDate = new Date();
  maxDate.setHours(0, 0, 0, 0);

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && date < maxDate) {
      return 'disabled-date';
    }
  };

  return (
    <section className="border-2 py-4 border-[#BDBDBD] px-[25px] min-991:py-[25px] rounded-2xl">
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
              <div className="">
                <h2 className="text-lg text-center font-semibold  text-[#101828]">
                  Request a tour
                </h2>
              </div>
              <div className="mt-2 mb-6">
                <h2 className="font-medium  text-[#182135]">
                  Select Tour Dates
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Choose up to 3 available days for your tour
                </p>

                {/* Tour Date Picker */}
                <div className="w-full box mt-3">
                  <div className="w-full relative">
                    <div
                      className={`flex gap-4 border-2 border-[#E5E7EB] h-[46px] w-full rounded-lg cursor-pointer justify-between items-center p-3`}
                      onClick={() => setShowTourCalendar((prev) => !prev)}
                    >
                      <p className="text-sm text-[#111827]">
                        {selectedTourDates.length > 0
                          ? `${selectedTourDates.length} date(s) selected`
                          : 'Select tour dates'}
                      </p>
                      <FaCalendarAlt className="h-4 w-4 text-[#6B7280]" />
                    </div>

                    {showTourCalendar && (
                      <div className="absolute max-w-[350px] mt-2 w-full z-30 bg-white shadow-lg rounded-lg border border-[#E5E7EB] p-2">
                        <Calendar
                          onChange={handleTourDateSelect}
                          value={tourDate}
                          tileDisabled={tileDisabled}
                          selectRange={false}
                          minDate={new Date()}
                          tileClassName={tileClassName}
                        />
                        <div className="mt-2 text-xs text-[#6B7280]">
                          Click dates to select (max 3)
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 ">
                  <p className="text-sm font-medium">Work Hours:</p>
                  <span className=" font-semibold">
                    {' '}
                    {data?.agentId?.supportingDocument?.workingHours}
                  </span>
                </div>
                {/* Selected Dates Display */}
                {selectedTourDates.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-[#6B7280] mb-2">
                      Selected tour dates:
                    </p>
                    <div className="space-y-2">
                      {selectedTourDates.map((date) => (
                        <div
                          key={date}
                          className="bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm flex items-center"
                        >
                          <FaCalendarAlt className="mr-2 text-[#6B7280]" />
                          {date}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Move-in Date Picker */}
              <div className="w-full box mb-6">
                <p className="text-sm font-medium text-[#111827] pb-2">
                  Desired move-in date
                </p>
                <div className="w-full relative">
                  <div
                    className={`flex gap-4 border-2 border-[#E5E7EB] h-[46px] w-full rounded-lg cursor-pointer ${
                      values.date ? 'justify-between' : 'justify-end'
                    } items-center p-3`}
                    onClick={() => setShowStartDate((prev) => !prev)}
                  >
                    <p className="text-sm text-[#111827]">
                      {values.date || 'Select date'}
                    </p>
                    <FiCalendar className="h-4 w-4 text-[#6B7280]" />
                  </div>

                  {showStartDate && (
                    <div className="absolute max-w-[350px] mt-2 w-full z-30 bg-white shadow-lg rounded-lg border border-[#E5E7EB] p-2">
                      <Calendar
                        onChange={(e) => {
                          setValues({
                            ...values,
                            date: formatDate(e),
                            issuedDate: formatDate(new Date()),
                          });
                          setShowStartDate(false);
                        }}
                        value={values?.date}
                        minDate={new Date()}
                        tileDisabled={tileDisabled}
                        tileClassName={tileClassName}
                        className="border-0"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="w-full">
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Additional notes (optional)
                </label>
                <textarea
                  name="details"
                  value={values.details}
                  onChange={handleChange}
                  className="textarea w-full border-2 border-[#E5E7EB] rounded-lg focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]"
                  placeholder="Any special requests or questions"
                  rows={4}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`py-3 w-full rounded-lg text-white mt-6 font-medium ${
                  isValid && dirty && selectedTourDates.length > 0
                    ? 'bg-primary hover:bg-[#1E3A8A]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!isValid || !dirty || selectedTourDates.length === 0}
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  'Request Tour'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};

export default Contact;
