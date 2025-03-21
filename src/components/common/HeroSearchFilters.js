import { useState } from 'react';
import { filterOptions } from './constants';
import { RiArrowDownSLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

import { FaChevronDown, FaCheck } from 'react-icons/fa';

const propertyTypes = [
  'Flat',
  'Apartment',
  'Duplex',
  'Bungalow',
  'Self Contain',
  'Penthouse',
  'Terraced House',
  'Loft',
];

const Dropdown = ({ label, options, value, onChange }) => (
  <div className="dropdown">
    <div
      tabIndex={0}
      role="button"
      className="btn bg-transparent border border-[#BDBDBD] hover:bg-transparent text-[#818181] font-normal flex items-center gap-2"
    >
      {value || label} <FaChevronDown />
    </div>
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50"
    >
      {options.map((option) => (
        <li key={option}>
          <button
            className="flex items-center gap-2"
            onClick={() => onChange(option)}
          >
            {value === option && <FaCheck className="text-green-500" />}{' '}
            {option}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const HeroSearchFilters = () => {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    propertyType: '',
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSendValues = () => {
    // Send the filter values (e.g., to an API or another component)
    console.log('Sending filter values:', filters);
    alert(`Filter values sent: ${JSON.stringify(filters, null, 2)}`);
  };

  return (
    <ul className="flex flex-wrap max-w-[1000px] mx-3 w-full max-auto  gap-2    rounded-md space-x-4 sm:space-x-4 justify-center text-[#818181] font-medium   px-2">
      <Dropdown
        label="Property Type"
        options={propertyTypes}
        value={filters.propertyType}
        onChange={(value) => handleChange('propertyType', value)}
      />
      <div className="flex gap-2">
        <label className="input flex  border-[#BDBDBD] items-center gap-2 focus-within:border-0">
          <input
            type="number"
            className="grow placeholder:text-sm w-24 !border-0 !focus:outline-none 
            !focus-visible:outline-none"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
        </label>
        <label className="input flex  border-[#BDBDBD] items-center gap-2 focus-within:border-0">
          <input
            type="number"
            className="grow placeholder:text-sm w-24 border-0 focus:outline-none focus-visible:outline-none"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
        </label>
      </div>
      <label className="input flex  border-[#BDBDBD] items-center gap-2 focus-within:border-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          className="grow placeholder:text-sm"
          placeholder="Search by location"
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </label>
      <button className="primary-btn">Search</button>
    </ul>
  );
};
export default HeroSearchFilters;
