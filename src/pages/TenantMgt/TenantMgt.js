import { useEffect, useMemo, useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { statuses, tenantCounts } from '../../components/common/constants';
import { FiFilter } from 'react-icons/fi';
import { SkeletonCard } from '../../components/Loaders/SkeletonCard';
import { FaTemperatureThreeQuarters } from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';
import TransactionTable from '../../components/data/TenantMgt/TransactionTable';
import { FiSearch } from 'react-icons/fi';
import { BiSortAlt2 } from 'react-icons/bi';
import { useGetAllRentals } from '../../services/query/agents';
import { formatDates } from '../../utils/helper';
import { useGetTenantCountsByStatus } from '../../services/query/properties';

const TenantMgt = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [startValue, startChange] = useState('');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [endValue, endChange] = useState('');
  const [duration, setDuration] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const { data: allCounts, isLoading: isLoadingCounts } =
    useGetTenantCountsByStatus();
  const { data: activeCounts } = useGetTenantCountsByStatus('Rented');
  const { data: pendingCounts } = useGetTenantCountsByStatus('Paid');
  const { data: expiredCounts } = useGetTenantCountsByStatus('Expired');

  const {
    data: allRentals,
    isLoading: isLoadingRentals,
    refetch,
  } = useGetAllRentals(
    page,
    limit,
    startValue ? formatDates(new Date(startValue)) : '',
    endValue ? formatDates(new Date(endValue)) : '',
    searchTerm.toLowerCase()
  );

  const { startRow, endRow } = useMemo(() => {
    if (!allRentals) {
      return { startRow: 1, endRow: 0 };
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = allRentals?.meta?.totalItems || 0;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    return { startRow: currentStartRow, endRow: currentEndRow };
  }, [allRentals, page, limit]);

  useEffect(() => {
    refetch();
  }, [allRentals?.data]);

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

  return (
    <div>
      <div className="flex justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-semibold text-lg md:text-xl text-black">
            Tenant Management
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

          <button className="primary-btn h-fit flex items-center gap-1">
            <AiOutlineDownload size={18} />
            <span>Export Data</span>
          </button>
        </div>
      </div>
      {/* Dashboard Cards Section */}
      <div className="flex overflow-x-scroll gap-4 mt-8 dashboard-cards">
        {isLoadingCounts
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : tenantCounts.map((data, i) => (
              <div
                key={i}
                className="w-full min-w-[257px] border border-[#E4E7EC] bg-white p-4 rounded-xl h-full"
              >
                <div className="text-sm h-full">
                  <p className="text-[#344054] font-semibold text-xl">
                    {i === 0
                      ? allCounts?.data
                      : i === 1
                      ? activeCounts?.data
                      : i === 2
                      ? pendingCounts?.data
                      : expiredCounts?.data}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>{data?.label}</p>
                    <div className="flex justify-center items-center border border-[#E4E7EC] rounded-full w-10 h-10">
                      <FaTemperatureThreeQuarters />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <GoArrowUpRight className="text-green-500" />
                    <p className="text-[#7C8DB5]">+1.01% this week</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div className="flex items-center justify-end gap-6 text-[#667185] mt-11 mb-2">
        <div className="flex items-center gap-2">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Search"
            className={`w-24 transition-all duration-300 bg-transparent outline-none border-b border-gray-300 focus:w-40 focus:border-gray-500`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 transition">
          <BiSortAlt2 size={18} />
          <span>Sort</span>
        </div>
      </div>
      <TransactionTable
        isLoading={isLoadingRentals}
        data={allRentals}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        startRow={startRow}
        endRow={endRow}
      />
    </div>
  );
};
export default TenantMgt;
