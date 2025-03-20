import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsDownload } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { BiSortAlt2 } from 'react-icons/bi';
import TransactionsTable from '../../components/data/Properties/TransactionsTable';
import { statuses } from '../../components/common/constants';
import { FiFilter } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import UpdateKycModal from '../../components/modals/UpdateKyc';
import { useGetUser } from '../../services/query/account';
import { useGetAllProperties } from '../../services/query/properties';
import { formatDates } from '../../utils/helper';
import { useListingPayment } from '../../services/query/payments';

const Properties = () => {
  const { type } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { data } = useGetUser();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [startValue, startChange] = useState('');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [endValue, endChange] = useState('');
  const [duration, setDuration] = useState('');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  // Memoized query status
  const queryStatus = useMemo(() => {
    if (selectedStatus !== 'Status') {
      if (selectedStatus === 'Active') {
        return 'Available';
      }
      return selectedStatus;
    }

    if (type.includes('all')) {
      return ''; // No status filter for "All Listings"
    }
    if (type.includes('unlisted')) {
      return 'Unlisted';
    }
    if (type.includes('active')) {
      return 'Available';
    }
    if (type.includes('rented')) {
      return 'Rented';
    }

    return ''; // Default to no status filter
  }, [selectedStatus, type]);

  // Memoized isLandlordOrAgent and isKycCompleted
  const isLandlordOrAgent = useMemo(() => {
    return (
      data &&
      (data?.data?.userType === 'Landlord' || data?.data?.userType === 'Agent')
    );
  }, [data]);

  const isKycCompleted = useMemo(() => {
    return (
      data?.data?.supportingDocumentProvided &&
      data?.data?.professionalDetailsCompleted
    );
  }, [data]);

  const pageTitle = useMemo(() => {
    if (type.includes('all')) {
      return 'All Listings';
    }
    if (type.includes('unlisted')) {
      return 'Unlisted Listings';
    }
    if (type.includes('active')) {
      return 'Active Listings';
    }
    return 'Rented Properties';
  }, [type]);

  const {
    data: allProperties,
    isLoading,
    refetch,
  } = useGetAllProperties(
    page,
    limit,
    startValue ? formatDates(new Date(startValue)) : '',
    endValue ? formatDates(new Date(endValue)) : '',
    queryStatus
  );

  const { startRow, endRow } = useMemo(() => {
    if (!allProperties) {
      return { startRow: 1, endRow: 0 };
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = allProperties?.meta?.totalItems || 0;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    return { startRow: currentStartRow, endRow: currentEndRow };
  }, [allProperties, page, limit]);

  useEffect(() => {
    setSelectedStatus('Status'); // Reset to default
  }, [type]);

  useEffect(() => {
    refetch();
  }, [type, selectedStatus, startValue, endValue, page, limit, refetch]);

  useEffect(() => {
    setPage(1);
  }, [limit, selectedStatus]);

  useEffect(() => {
    const calculateDates = () => {
      const currentDate = new Date();
      let startDate;

      if (duration.includes('3 months')) {
        startDate = new Date();
        startDate.setMonth(currentDate.getMonth() - 3);
      } else if (duration.includes('6 months')) {
        startDate = new Date();
        startDate.setMonth(currentDate.getMonth() - 6);
      } else {
        startChange('');
        endChange('');
      }

      if (startDate) {
        startChange(startDate.toISOString().split('T')[0]);
        endChange(currentDate.toISOString().split('T')[0]);
      }
    };

    calculateDates();
  }, [duration]);

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
    <>
      <div className="flex justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-semibold text-lg md:text-xl text-black">
            {pageTitle}
          </h3>
          <p className="text-[#475367]">
            Here is all the information you need on all your listings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="secondary-btn h-fit flex box items-center gap-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FiFilter size={16} />
              {selectedStatus}
            </button>
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

          <button
            className="primary-btn h-fit flex items-center gap-1"
            onClick={() =>
              isLandlordOrAgent && !isKycCompleted
                ? setShowModal(true)
                : navigate('/add-property-info')
            }
          >
            <IoIosAddCircleOutline size={18} />
            <span>Add Property</span>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end gap-6 text-[#667185] mt-11 mb-2">
        <div className="flex items-center gap-2">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Search"
            className={`w-24 transition-all duration-300 bg-transparent outline-none border-b border-gray-300 focus:w-40 focus:border-gray-500`}
          />
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 transition">
          <BiSortAlt2 size={18} />
          <span>Sort</span>
        </div>
      </div>
      <UpdateKycModal showModal={showModal} setShowModal={setShowModal} />
      <TransactionsTable
        isLoading={isLoading}
        data={allProperties}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        startRow={startRow}
        endRow={endRow}
      />
    </>
  );
};

export default Properties;
