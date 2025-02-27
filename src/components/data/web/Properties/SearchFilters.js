import React, { useState } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';

const propertyTypes = ['Flat', 'Terrace', 'Detached', 'Duplex'];
const priceOptions = ['Low', 'Medium', 'High'];
const roomOptions = ['1', '2', '3+'];

const SearchFilters = () => {
  const [filters, setFilters] = useState({
    location: '',
    price: '',
    rooms: '',
    propertyType: '',
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const Dropdown = ({ label, options, value, onChange }) => (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-outline text-[#818181] font-normal border-2 border-[#BDBDBD] flex items-center gap-2"
      >
        {value || label} <FaChevronDown />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100  rounded-box w-52 z-50"
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

  return (
    <section className="py-6">
      <div className="flex flex-wrap items-center gap-4 max-w-6xl mx-auto">
        <label className="input flex  border-2 border-[#BDBDBD] items-center gap-2">
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
            placeholder="Search by location "
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </label>
        <Dropdown
          label="Price"
          options={priceOptions}
          value={filters.price}
          onChange={(value) => handleChange('price', value)}
        />
        <Dropdown
          label="Rooms"
          options={roomOptions}
          value={filters.rooms}
          onChange={(value) => handleChange('rooms', value)}
        />
        <Dropdown
          label="Property Type"
          options={propertyTypes}
          value={filters.propertyType}
          onChange={(value) => handleChange('propertyType', value)}
        />
        <button className="btn bg-[#E8F8FD] text-primary">Save Search</button>
      </div>
    </section>
  );
};

export default SearchFilters;
