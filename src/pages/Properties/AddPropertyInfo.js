import { useEffect, useState } from 'react';

import FormStepOne from '../../components/data/Properties/FormStepOne';
import toast from 'react-hot-toast';
import { useAddProperty } from '../../services/query/properties';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useGetCountriesStates } from '../../services/query/locations';

const AddPropertyInfo = () => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });

  const [country, setCountry] = useState({
    value: 'Nigeria',
    label: 'Nigeria',
  });

  const generateDescription = async (inputs) => {
    try {
      const prompt = `Generate a professional and engaging property description for a ${
        inputs.type
      } located in ${inputs.location}. It has ${
        inputs.noOfRooms
      } rooms and includes the following amenities: ${inputs.amenities.join(
        ', '
      )}.`;
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0].text) {
        return data.choices[0].text.trim();
      } else {
        throw new Error('Failed to generate description');
      }
    } catch (error) {
      console.error('Error generating description:', error);
      return '';
    }
  };

  const [values, setValues] = useState({
    title: '',
    type: '',
    description: '',
    noOfRooms: '',
    location: '',
    amount: '',
    country: { value: 'Nigeria', label: 'Nigeria' },
    state: '',
    cautionFee: '',
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

  const { data: countriess, isLoading: isCountry } = useGetCountriesStates();

  const countriesOptions = countriess?.data?.map((country) => ({
    value: country?.name,
    label: country?.name,
  }));

  const states = countriess?.data?.filter(
    (item) => item?.name === country?.value
  );

  const statesOptions =
    countriess?.data &&
    states[0]?.states?.map(
      (state) =>
        ({
          value: state?.name?.replace(' State', ''),
          label: state?.name?.replace(' State', ''),
        } || [])
    );

  useEffect(() => {
    if (countriesOptions && values.country.value !== 'Nigeria') {
      const nigeriaOption = countriesOptions.find(
        (option) => option.value === 'Nigeria'
      );
      if (nigeriaOption) {
        setValues((prevValues) => ({
          ...prevValues,
          country: nigeriaOption,
        }));
        setCountry(nigeriaOption);
      }
    }
  }, [countriesOptions, values.country]);

  const handleSubmit = () => {
    if (checkedItems.insured) {
      navigate('/insurance-details', {
        state: {
          ...values,
          selectedAmenities,
          customAmenities,
          rentalPeriod,
          checkedItems,
        },
      });
    } else {
      mutate({
        title: values.title,
        type: values.type.value,
        description: values.description,
        numberOfRooms: Number(values.noOfRooms),
        address: values?.location,
        pricePerYear: Number(values?.amount.replace(/\D/g, '')),
        amenities: selectedAmenities,
        rentalPeriod: rentalPeriod ? 'Yearly' : 'Monthly',
        insured: checkedItems.insured,
        newConstruction: checkedItems.newConstruction,
        state: values?.state?.value,
        cautionFee: Number(values?.cautionFee),
      });
    }
  };

  return (
    <>
      <button
        className="flex items-center gap-1"
        onClick={() => {
          navigate(-1);
          sessionStorage.removeItem('action');
        }}
      >
        <IoChevronBackOutline /> <span>Back</span>
      </button>
      <div className=" max-w-[666px] bg-white rounded-lg mt-[30px] mx-auto py-10 px-8 md:px-14 border border-[#F5F5F5]">
        <h2 className="text-center text-lg md:text-xl  font-semibold">
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
          statesOptions={statesOptions}
          isCountry={isCountry}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};
export default AddPropertyInfo;
