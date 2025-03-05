import { useState } from 'react';

import FormStepOne from '../../components/data/Properties/FormStepOne';
import toast from 'react-hot-toast';
import { useAddProperty } from '../../services/query/properties';
import { useNavigate } from 'react-router-dom';

const AddPropertyInfo = () => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const [values, setValues] = useState({
    title: '',
    type: '',
    description: '',
    noOfRooms: '',
    location: '',
    amount: '',
  });
  const navigate = useNavigate();

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [customAmenities, setCustomAmenities] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState(true);
  const [checkedItems, setCheckedItems] = useState({
    insured: false,
    newConstruction: false,
  });

  const { mutate, isLoading } = useAddProperty({
    onSuccess: (res) => {
      successToast(res?.message);
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
      title: values.title,
      type: values.type.value,
      description: values.description,
      numberOfRooms: Number(values.noOfRooms),
      location: values?.location,
      pricePerYear: Number(values?.amount.replace(/\D/g, '')),
      amenities: selectedAmenities,
      rentalPeriod: rentalPeriod ? 'Yearly' : 'Monthly',
      insured: checkedItems.insured,
      newConstruction: checkedItems.newConstruction,
    });
  };

  return (
    <div
      style={{
        fontFamily: 'sansation',
      }}
      className=" max-w-[666px] bg-white rounded-lg mt-[30px] mx-auto py-10 px-8 md:px-14 border border-[#F5F5F5]"
    >
      <h2 className="text-center text-lg md:text-xl text-black">
        Property Information Form
      </h2>

      <FormStepOne
        values={values}
        setValues={setValues}
        customAmenities={customAmenities}
        setCustomAmenities={setCustomAmenities}
        setSelectedAmenities={setSelectedAmenities}
        selectedAmenities={selectedAmenities}
        rentalPeriod={rentalPeriod}
        setRentalPeriod={setRentalPeriod}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
export default AddPropertyInfo;
