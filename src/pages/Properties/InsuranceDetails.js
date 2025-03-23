import { useState } from 'react';
import FormInput from '../../components/common/FormInput';
import { useAddProperty } from '../../services/query/properties';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const InsuranceDetails = () => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });

  const navigate = useNavigate();

  const location = useLocation();

  const [values, setValues] = useState({
    ownerName: '',
    insurerName: '',
    riskInsured: '',
  });

  const {
    title,
    type,
    description,
    noOfRooms,
    location: propertyLocation,
    amount,
    selectedAmenities,
    rentalPeriod,
    checkedItems,
  } = location.state;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevInput) => ({ ...prevInput, [name]: value }));
  };
  const isFormFilled = Object.values(values).every((value) => value);

  const { mutate, isLoading } = useAddProperty({
    onSuccess: (res) => {
      // successToast(res?.message);
      sessionStorage.setItem('propertyDetails', JSON.stringify(res));
      navigate('/property-uploads');
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });
  const handleSubmit = () => {
    mutate({
      title: title,
      type: type.value,
      description: description,
      numberOfRooms: Number(noOfRooms),
      location: propertyLocation,
      pricePerYear: Number(amount.replace(/\D/g, '')),
      amenities: selectedAmenities,
      rentalPeriod: rentalPeriod ? 'Yearly' : 'Monthly',
      insured: checkedItems.insured,
      newConstruction: checkedItems.newConstruction,
      propertyOwner: values?.ownerName,
      insuranceCompany: values?.insurerName,
      insuranceType: values?.riskInsured,
      state: values?.state?.value,
      cautionFee: Number(values?.cautionFee),
    });
  };

  return (
    <div className=" max-w-[666px] bg-white rounded-lg mt-[30px] mx-auto py-10 px-8 md:px-14 border border-[#F5F5F5]">
      <h2 className="text-center font-semibold text-lg md:text-xl text-black">
        Property Insurance Details
      </h2>
      <div className="grid gap-2 font-medium">
        <FormInput
          label="Property Owner's Name"
          name="ownerName"
          type="text"
          value={values.ownerName}
          onChange={handleInputChange}
          placeholder="Enter Owner's Name"
        />
        <FormInput
          label="Insurer’s Name"
          name="insurerName"
          type="text"
          value={values.insurerName}
          onChange={handleInputChange}
          placeholder="Enter Insurer Name"
        />
        <FormInput
          label="Risk Insured"
          name="riskInsured"
          type="text"
          value={values.riskInsured}
          onChange={handleInputChange}
          placeholder="Enter Risk Insured"
        />
        <button
          className={`primary-btn ${
            !isFormFilled
              ? '!bg-gray-300 !border-0 hover:text-white'
              : 'bg-primary'
          }`}
          disabled={!isFormFilled}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
};
export default InsuranceDetails;
