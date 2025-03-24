import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetProperty,
  useUpdateProperty,
} from '../../services/query/properties';
import FormInput from '../../components/common/FormInput';
import Select from 'react-select';
import {
  amenitiesList,
  propertyTypes,
} from '../../components/common/constants';
import { IoIosArrowDown } from 'react-icons/io';
import Loader from '../../components/Loaders/Loader';
import toast from 'react-hot-toast';

const ViewPropertyDetails = () => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const action = sessionStorage.getItem('action');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [customAmenities, setCustomAmenities] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState(true);
  const [checkedItems, setCheckedItems] = useState({
    insured: false,
    newConstruction: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetProperty(id);
  const [values, setValues] = useState({
    title: '',
    type: null, // Initialize type as null
    description: '',
    noOfRooms: '',
    location: '',
    amount: '',
    ownerName: '',
    insurerName: '',
    riskInsured: '',
    cautionFee: '',
  });

  const { mutate, isLoading: isUpdating } = useUpdateProperty({
    onSuccess: (res) => {
      successToast(res?.message);
      // sessionStorage.setItem('propertyDetails', JSON.stringify(res));
      navigate('/my-properties/all');
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  useEffect(() => {
    if (data?.data) {
      const defaultType = propertyTypes.find(
        (type) => type.value === data.data.type
      );

      const formattedType = defaultType
        ? { value: defaultType.value, label: defaultType.name }
        : null;
      const formattedPrice =
        Number(data?.data?.rentPrice?.$numberDecimal)?.toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
          }
        ) || '0.00';

      const formattedCautionFee =
        Number(data?.data?.cautionFee?.$numberDecimal)?.toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
          }
        ) || '0.00';

      setSelectedAmenities(data?.data?.amenities);
      setCheckedItems({
        ...checkedItems,
        insured: data?.data?.insured,
        newConstruction: data?.data?.newConstruction,
      });
      setRentalPeriod(data?.data?.rentalPeriod === 'Yearly' ? true : false);
      setValues({
        ...values,
        title: data.data.title || 'N/A',
        type: action === 'view' ? formattedType : null,
        location: data?.data?.address || 'N/A',
        amount: formattedPrice || 'N/A',
        description: data?.data?.description || 'N/A',
        noOfRooms: data?.data?.numberOfRooms || 'N/A',
        ownerName: data?.data?.propertyOwner || 'N/A',
        insurerName: data?.data?.insuranceCompany || 'N/A',
        riskInsured: data?.data?.insuranceType || 'N/A',
        cautionFee: formattedCautionFee || 'N/A',
      });
    }
  }, [data, id, action]);

  const handleInputChange = (event) => {
    if (action !== 'view') {
      const { name, value } = event.target;
      setValues((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  const propertyOptions = useMemo(
    () =>
      propertyTypes.map((id) => ({
        value: id?.value,
        label: id?.name,
      })),
    []
  );

  const updateTextViews = (event) => {
    if (action !== 'view') {
      let inputValue = event.target.value;

      inputValue = inputValue.replace(/[^0-9.]/g, '');

      // Prevent multiple decimal points
      const parts = inputValue.split('.');
      if (parts.length > 2) return;

      // Format the number with commas (only before the decimal point)
      const integerPart = parts[0];
      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      );

      const decimalPart = parts[1] !== undefined ? `.${parts[1]}` : '';

      // Combine integer and decimal parts
      const formattedValue = formattedIntegerPart + decimalPart;

      setValues((prevValues) => ({
        ...prevValues,
        amount: formattedValue,
      }));
    }
  };

  const handleCustomChange = (e) => {
    if (action !== 'view') {
      setCustomAmenities(e.target.value);
    }
  };

  const isFormFilled = Object.values(values).every((value) => value);

  const handleAddCustomAmenity = (e) => {
    e.preventDefault(); // Prevent page reload
    if (
      action !== 'view' &&
      customAmenities.trim() &&
      !selectedAmenities.includes(customAmenities)
    ) {
      setSelectedAmenities((prev) => [...prev, customAmenities]);
      setCustomAmenities(''); // Clear input field
    }
  };

  // Remove an amenity from selection
  const handleRemoveAmenity = (amenity) => {
    if (action !== 'view') {
      setSelectedAmenities((prev) => prev.filter((item) => item !== amenity));
    }
  };

  const handleCheckboxChange = (amenity) => {
    if (action !== 'view') {
      setSelectedAmenities(
        (prev) =>
          prev.includes(amenity)
            ? prev.filter((item) => item !== amenity) // Remove if exists
            : [...prev, amenity] // Add if not exists
      );
    }
  };

  const handleCheckChange = useCallback(
    (name) => {
      if (action !== 'view') {
        setCheckedItems((prev) => ({ ...prev, [name]: !prev[name] }));
      }
    },
    [action]
  );

  const updateTextViews2 = (event) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Prevent multiple decimal points
    const parts = inputValue.split('.');
    if (parts.length > 2) return;

    // Format the number with commas (only before the decimal point)
    const integerPart = parts[0];
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    );

    const decimalPart = parts[1] !== undefined ? `.${parts[1]}` : '';

    // Combine integer and decimal parts
    const formattedValue = formattedIntegerPart + decimalPart;

    setValues((prevValues) => ({
      ...prevValues,
      cautionFee: formattedValue,
    }));
  };

  const handleSubmit = () => {
    mutate({
      id,
      data: {
        title: values.title,
        type: values.type.value,
        description: values.description,
        numberOfRooms: Number(values.noOfRooms),
        location: values?.location,
        rentPrice: Number(values?.amount.replace(/\D/g, '')),
        amenities: selectedAmenities,
        rentalPeriod: rentalPeriod ? 'Yearly' : 'Monthly',
        insured: checkedItems.insured,
        newConstruction: checkedItems.newConstruction,
        propertyOwner: values?.ownerName,
        insuranceCompany: values?.insurerName,
        insuranceType: values?.riskInsured,
      },
    });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      minHeight: '46px',
      color: '#444',
      fontSize: '14px',
      cursor: action === 'view' ? 'default' : 'pointer', // Disable cursor in view mode
      borderRadius: '10px',
      border: state.hasValue
        ? '2px solid hsla(227, 86%, 49%, 1)'
        : '2px solid rgba(15, 23, 43, 0.3)',
      paddingRight: '16px',
      background: state.hasValue ? '#ffff' : 'unset',
      pointerEvents: action === 'view' ? 'none' : 'auto', // Disable pointer events
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: '13px',
      backgroundColor: '#fff',
      display: action === 'view' ? 'none' : 'block', // Hide dropdown menu in view mode
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '' : '',
      backgroundColor: state.isFocused ? '#f4f6f8' : '',
    }),
  };

  if (isLoading) {
    return <Loader />;
  }
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
          {action === 'edit' ? 'Edit Property Details' : 'Property Details'}
        </h2>
        <div className="grid  gap-2 font-medium">
          <FormInput
            label="Title"
            name="title"
            type="text"
            readOnly={action === 'view'}
            value={values.title}
            onChange={handleInputChange}
            placeholder="Luxurious 3-Bedroom Flat in Lagos"
          />
          <div>
            <p className=" pb-2 ">Property Type</p>
            <Select
              styles={customStyles}
              placeholder="Select Property Type"
              options={propertyOptions}
              value={values.type}
              components={{
                IndicatorSeparator: () => (
                  <div style={{ display: 'none' }}></div>
                ),
                DropdownIndicator: () => (
                  <IoIosArrowDown size="15px" color="#646668" />
                ),
              }}
              name="type"
              onChange={(selectedOption) => {
                if (action !== 'view') {
                  setValues((prevInput) => ({
                    ...prevInput,
                    type: selectedOption,
                  }));
                }
              }}
            />
          </div>
          <FormInput
            label="Location"
            name="location"
            type="text"
            value={values.location}
            readOnly={action === 'view'}
            onChange={handleInputChange}
            placeholder="123, Adetokunbo Way, Allen Avenue, Lagos"
          />
          <div className="flex flex-col">
            <label className="pb-2">Property Description</label>
            <textarea
              value={values.description}
              name="description"
              readOnly={action === 'view'}
              onChange={handleInputChange}
              maxLength={500}
              placeholder="Enter property description..."
              className="mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              rows={4}
            />
            <p className="mt-1 text-sm text-gray-500">
              *Not more than 500 characters
            </p>
          </div>
          <FormInput
            label={`Price Per ${rentalPeriod ? 'Year' : 'Month'}`}
            name="amount"
            readOnly={action === 'view'}
            type="tel"
            value={values.amount}
            inputMode="decimal"
            pattern="[0-9.,]+"
            holder="Enter Amount"
            onChange={updateTextViews}
            placeholder="Enter Amount"
          />
          <FormInput
            label="Caution fee(optional)"
            name="cautionFee"
            readOnly={action === 'view'}
            type="tel"
            value={values.cautionFee}
            inputMode="decimal"
            pattern="[0-9.,]+"
            holder="Enter Amount"
            onChange={updateTextViews2}
            placeholder="Enter Amount"
          />
          <FormInput
            label="Number of Rooms"
            name="noOfRooms"
            type="tel"
            value={values.noOfRooms}
            readOnly={action === 'view'}
            inputMode="decimal"
            pattern="[0-9.,]+"
            onChange={handleInputChange}
            placeholder="3"
          />
          <div>
            <p className="text-lg">Amenities</p>

            <div className="mt-1 space-y-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleCheckboxChange(amenity)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={action === 'view'}
                  />
                  <span className="text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
            {action !== 'view' && (
              <form onSubmit={handleAddCustomAmenity}>
                <FormInput
                  label="Others (custom amenities)"
                  name="customAmenities"
                  type="text"
                  value={customAmenities}
                  onChange={handleCustomChange}
                  placeholder="SPA and Gym"
                />
              </form>
            )}
            {/* Selected Amenities Display */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedAmenities.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  <span>{amenity}</span>
                  {action !== 'view' && (
                    <button
                      onClick={() => handleRemoveAmenity(amenity)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rental Period Toggle */}
        <div className="flex items-center justify-between my-4">
          <span className="text-gray-600 font-medium">
            Rental Period (Monthly/Yearly)
          </span>
          <input
            type="checkbox"
            readOnly={action === 'view'}
            className="toggle toggle-primary "
            checked={rentalPeriod}
            onChange={() => setRentalPeriod(!rentalPeriod)}
          />
        </div>
        {/* Property Checkboxes */}
        <div className="space-y-3 pb-9">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checkedItems.insured}
              onChange={() => handleCheckChange('insured')}
              className="hidden"
            />
            <div
              className={`w-5 h-5 flex items-center justify-center rounded-md ${
                checkedItems.insured ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              {checkedItems.insured && (
                <span className="text-white text-xs">✔</span>
              )}
            </div>
            <span className="text-gray-800">Is this property insured?</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checkedItems.newConstruction}
              onChange={() => handleCheckChange('newConstruction')}
              className="hidden"
            />
            <div
              className={`w-5 h-5 flex items-center justify-center rounded-md ${
                checkedItems.newConstruction ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              {checkedItems.newConstruction && (
                <span className="text-white text-xs">✔</span>
              )}
            </div>
            <span className="text-gray-800">
              Is this property a new construction?
            </span>
          </label>
        </div>
        {data?.data?.insured && (
          <div className="grid gap-2 font-medium mb-4">
            <FormInput
              label="Property Owner's Name"
              name="ownerName"
              type="text"
              readOnly={action === 'view'}
              value={values.ownerName}
              onChange={handleInputChange}
              placeholder="Enter Owner's Name"
            />
            <FormInput
              label="Insurer’s Name"
              name="insurerName"
              type="text"
              value={values.insurerName}
              readOnly={action === 'view'}
              onChange={handleInputChange}
              placeholder="Enter Insurer Name"
            />
            <FormInput
              label="Risk Insured"
              name="riskInsured"
              readOnly={action === 'view'}
              type="text"
              value={values.riskInsured}
              onChange={handleInputChange}
              placeholder="Enter Risk Insured"
            />
          </div>
        )}
        {action !== 'view' && (
          <button
            className={`primary-btn w-full ${
              !isFormFilled
                ? '!bg-gray-300 !border-0 hover:text-white'
                : 'bg-primary'
            }`}
            disabled={!isFormFilled}
            onClick={handleSubmit}
          >
            {isUpdating ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              'Update'
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default ViewPropertyDetails;
