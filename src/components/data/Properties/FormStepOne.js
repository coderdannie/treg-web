import { amenitiesList, propertyTypes } from '../../common/constants';
import FormInput from '../../common/FormInput';
import { IoIosArrowDown } from 'react-icons/io';
import Select from 'react-select';

const FormStepOne = ({
  values,
  setValues,
  customAmenities,
  setCustomAmenities,
  setSelectedAmenities,
  selectedAmenities,
  setRentalPeriod,
  setCheckedItems,
  checkedItems,
  rentalPeriod,
  isLoading,
  statesOptions,
  isCountry,
  handleSubmit,
}) => {
  const handleCustomChange = (e) => {
    setCustomAmenities(e.target.value);
  };
  const handleAddCustomAmenity = (e) => {
    e.preventDefault(); // Prevent page reload
    if (
      customAmenities.trim() &&
      !selectedAmenities.includes(customAmenities)
    ) {
      setSelectedAmenities((prev) => [...prev, customAmenities]);
      setCustomAmenities(''); // Clear input field
    }
  };

  // Remove an amenity from selection
  const handleRemoveAmenity = (amenity) => {
    setSelectedAmenities((prev) => prev.filter((item) => item !== amenity));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleCheckboxChange = (amenity) => {
    setSelectedAmenities(
      (prev) =>
        prev.includes(amenity)
          ? prev.filter((item) => item !== amenity) // Remove if exists
          : [...prev, amenity] // Add if not exists
    );
  };
  const handleCheckChange = (name) => {
    setCheckedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const propertyOptions = propertyTypes?.map((id) => ({
    value: id?.value,
    label: id?.name,
  }));

  const updateTextViews = (event) => {
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
  };

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

  const isFormFilled = Object.entries(values).every(([key, value]) => {
    if (key === 'cautionFee') return true;
    return value;
  });

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      minHeight: '46px',
      color: '#444',
      fontSize: '14px',
      cursor: 'pointer',
      borderRadius: '10px',
      border: state.hasValue
        ? '2px solid hsla(227, 86%, 49%, 1)'
        : '2px solid rgba(15, 23, 43, 0.3)',
      paddingRight: '16px',
      background: state.hasValue ? '#ffff' : 'unset',
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

  return (
    <div className="grid gap-2 font-medium">
      <FormInput
        label="Title"
        name="title"
        type="text"
        value={values.title}
        onChange={handleInputChange}
        placeholder="Luxurious 3-Bedroom Flat in Lagos"
      />
      <div>
        <p className=" pb-2 text-sm">Property Type</p>
        <Select
          styles={customStyles}
          placeholder="Select Property Type"
          options={propertyOptions}
          value={values.type}
          components={{
            IndicatorSeparator: () => <div style={{ display: 'none' }}></div>,
            DropdownIndicator: () => (
              <IoIosArrowDown size="15px" color="#646668" />
            ),
          }}
          name="type"
          onChange={(selectedOption) => {
            handleInputChange({
              target: {
                name: 'type',
                value: selectedOption,
              },
            });
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2 text-sm">Property Description</label>
        <textarea
          value={values.description}
          name="description"
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
        label="Number of Rooms"
        name="noOfRooms"
        type="tel"
        value={values.noOfRooms}
        //   error={
        //     values.noOfRooms &&
        //     typeof values.noOfRooms !== 'number' &&
        //     'invalid type'
        //   }
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
              />
              <span className="text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
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
        {/* Selected Amenities Display */}
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedAmenities.map((amenity, i) => (
            <div
              key={i}
              className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              <span>{amenity}</span>
              <button
                onClick={() => handleRemoveAmenity(amenity)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
      <FormInput
        label="Location"
        name="location"
        type="text"
        value={values.location}
        onChange={handleInputChange}
        placeholder="123, Adetokunbo Way, Allen Avenue, Lagos"
      />
      <div>
        <p className=" pb-2 text-sm ">Select State</p>

        <Select
          styles={customStyles}
          placeholder="Select State"
          options={statesOptions}
          value={values?.state}
          isDisabled={!values?.country}
          components={{
            IndicatorSeparator: () => <div style={{ display: 'none' }}></div>,
            DropdownIndicator: () => (
              <div>
                {isCountry ? (
                  <div className="spinner border-t-transparent border-4 border-[#E7F2FF] w-6 h-6 rounded-full animate-spin"></div>
                ) : (
                  <IoIosArrowDown size="15px" color="#646668" />
                )}
              </div>
            ),
          }}
          name="state"
          onChange={(selectedOption) => {
            setValues({
              ...values,
              state: selectedOption,
            });
          }}
        />
      </div>

      <FormInput
        label={`Price Per ${rentalPeriod ? 'Year' : 'Month'}`}
        name="amount"
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
        type="tel"
        value={values.cautionFee}
        inputMode="decimal"
        pattern="[0-9.,]+"
        holder="Enter Amount"
        onChange={updateTextViews2}
        placeholder="Enter Amount"
      />

      {/* Rental Period Toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 font-medium">
          Rental Period (Monthly/Yearly)
        </span>
        <input
          type="checkbox"
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
  );
};
export default FormStepOne;
