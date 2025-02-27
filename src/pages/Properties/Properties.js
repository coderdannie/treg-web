import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsDownload } from 'react-icons/bs';

import { FiSearch } from 'react-icons/fi';
import { BiSortAlt2 } from 'react-icons/bi';
import TransactionsTable from '../../components/data/Properties/TransactionsTable';
import { statuses } from '../../components/common/constants';
import { FiFilter } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Properties = () => {
  const { type } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Status');
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.box') === null) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-semibold text-lg md:text-xl text-black">
            {type.includes('all')
              ? 'All Listings'
              : type.includes('pending')
              ? 'Pending Approval'
              : type.includes('active')
              ? 'Active Listings'
              : 'Rented Properties'}
          </h3>
          <p className="text-[#475367]">
            Here is all the information you need on all your listings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="secondary-btn h-fit flex box  items-center gap-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FiFilter size={16} />
              {selectedStatus}
            </button>{' '}
            {/* Dropdown Menu */}
            {isOpen && (
              <ul className="absolute left-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {statuses.map((status) => (
                  <li
                    key={status}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700 text-sm"
                    onClick={() => {
                      setSelectedStatus(status);
                      setIsOpen(false);
                    }}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* <button className="primary-btn h-fit flex items-center gap-1">
            <BsDownload />
            <span>Export Data</span>
          </button> */}
          <Link
            to="/add-properties/add-property-info"
            className="primary-btn h-fit flex items-center gap-1"
          >
            <IoIosAddCircleOutline size={18} />
            <span>Add Property</span>
          </Link>
        </div>
      </div>{' '}
      <div className="flex items-center justify-end gap-6 text-[#667185] mt-11 mb-2">
        {/* Search Input */}
        <div className="flex items-center gap-2">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Search"
            className={`w-24 transition-all duration-300 bg-transparent outline-none border-b border-gray-300 focus:w-40 focus:border-gray-500`}
          />
        </div>

        {/* Sort Option */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 transition">
          <BiSortAlt2 size={18} />
          <span>Sort</span>
        </div>
      </div>
      <TransactionsTable />
    </div>
  );
};
export default Properties;
