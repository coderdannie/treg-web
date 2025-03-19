import { useEffect, useMemo, useState } from 'react';
import { statuses } from '../../../components/common/constants';
import { FiFilter } from 'react-icons/fi';
import { useGetAllTenantPropertyHistories } from '../../../services/query/properties';
import { formatDates } from '../../../utils/helper';
import PropertyHisTable from '../../../components/data/Tenant/PropertyHisTable';
const Property = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [startValue, startChange] = useState('');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [endValue, endChange] = useState('');
  const [duration, setDuration] = useState('');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const {
    data: allProperties,
    isLoading,
    refetch,
  } = useGetAllTenantPropertyHistories(
    page,
    limit,
    startValue ? formatDates(new Date(startValue)) : '',
    endValue ? formatDates(new Date(endValue)) : ''
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
    <>
      <div className="flex justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-semibold text-lg md:text-xl text-black">
            My Properties
          </h3>
          <p className="text-[#475367]">
            Here is all the information you need on all your properties (both
            current and past)
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
            <span>Export Data</span>
          </button>
        </div>
        <div className="mt-8 w-full">
          <PropertyHisTable
            isLoading={isLoading}
            data={allProperties}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            startRow={startRow}
            endRow={endRow}
          />
        </div>
      </div>
    </>
  );
};
export default Property;
