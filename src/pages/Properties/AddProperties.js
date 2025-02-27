import { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { BsDownload } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { BiSortAlt2 } from 'react-icons/bi';
import { statuses } from '../../components/common/constants';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

const AddProperties = () => {
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
            Add new properties
          </h3>
          <p className="text-[#475367]">
            Manage your property listings and keep them up to date.
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
          <Link
            to="/add-properties/add-property-info"
            className="primary-btn h-fit flex items-center gap-1"
          >
            <IoIosAddCircleOutline size={18} />
            <span>Add Property</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AddProperties;
