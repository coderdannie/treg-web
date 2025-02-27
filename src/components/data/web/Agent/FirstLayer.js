import { useState, useEffect } from 'react';
import { useGetCountriesStates } from '../../../../services/query/locations';
import { IoIosArrowDown } from 'react-icons/io';
import Select from 'react-select';
import { agents } from '../../../common/constants';
import { Link } from 'react-router-dom';

const FirstLayer = () => {
  const [values, setValues] = useState({
    country: { value: 'Nigeria', label: 'Nigeria' },
    state: '',
  });

  const [country, setCountry] = useState({
    value: 'Nigeria',
    label: 'Nigeria',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevInput) => ({ ...prevInput, [name]: value }));
  };

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
        ? '1px solid #D2D2D2'
        : '1px solid rgba(15, 23, 43, 0.3)',
      paddingRight: '16px',
      background: state.hasValue ? '#E8EEFD' : 'unset',
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

  return (
    <div className="align-element mb-[80px] md:mb-[120px]">
      <div className="text-center mx-auto max-w-[760px]">
        <h1 className="font-sub-heading text-[#18181B]  pt-14 pb-3">
          Meet our Agents
        </h1>
        <p>
          Discover a team of dedicated, experienced real estate professionals
          ready to help you find your perfect property. Our agents combine
          market expertise, personalized service, and a passion for connecting
          clients with their dream homes
        </p>
        <h4 className="font-semibold  mt-6">Search by location</h4>
        <div className="h-[27px] mt-2 max-w-[500px] mx-auto grid md:grid-cols-2 gap-4">
          <Select
            styles={customStyles}
            placeholder="Select Country"
            options={countriesOptions}
            value={values.country}
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
            name="country"
            onChange={(selectedOption) => {
              setValues({
                ...values,
                country: selectedOption,
              });
              handleInputChange({
                target: {
                  name: 'country',
                  value: selectedOption,
                },
              });
              setCountry(selectedOption);
            }}
          />
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
      </div>
      <div className="grid grid-cols-1 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            className="bg-white rounded-xl shadow-md overflow-hidden p-4"
            to={`/agents/${agent.id}`}
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full object-top   h-40 object-cover rounded-md"
            />
            <div className="mt-4">
              <h3 className="md:text-lg font-semibold text-[#101828]">
                {agent.name}
              </h3>
              <p className="text-[#475467] text-sm">{agent.role}</p>
              <div className="rounded-md bg-[#A1D8FF] my-4 h-[3px]"></div>
              <button className="mt-2 py-2 w-full primary-btn">
                View Profile
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FirstLayer;
