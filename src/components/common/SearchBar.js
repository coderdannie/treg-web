import React from 'react';
import { IoSearch } from 'react-icons/io5';

const SearchInput = ({ placeholder = 'Search', value, setValue }) => {
  return (
    <div className="flex items-center w-full h-full rounded-[8px] border-2 border-[#94A3B8]  px-[12px] shadow-sm">
      {/* Search Icon */}
      <IoSearch className="w-[16px] h-[16px] text-[#9E9E9E]" />

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={value || ''} // Ensure value is never undefined
        onChange={(e) => setValue(e.target.value)}
        className="ml-[8px] w-full bg-transparent text-[14px] text-[#333333] placeholder:text-[#9E9E9E] outline-none"
      />
    </div>
  );
};

export default SearchInput;
