import { useMemo, useState } from 'react';
import {
  headers,
  statuses,
  transHeaders,
} from '../../components/common/constants';
import CustomTable from '../../components/common/CustomTable';
import {
  useGetAgentTransactions,
  useGetTenantTransactions,
} from '../../services/query/transaction';
import { formatDateTime } from '../../utils/helper';
import { FiEye } from 'react-icons/fi';
import { FiFilter } from 'react-icons/fi';
import TransactionDetails from '../../components/modals/TransactionDetails';

const Transactions = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const isLandlordOrAgent = useMemo(() => {
    return (
      user &&
      (user?.data?.userType === 'Landlord' || user?.data?.userType === 'Agent')
    );
  }, [user]);

  const { data, isLoading } = useGetAgentTransactions();
  const { data: tenantTransactions, isLoading: isLoadingTenantTransations } =
    useGetTenantTransactions();
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isShow, setIsShow] = useState(false);

  const handleViewDetails = (row) => {
    setSelectedRow(row);
    setIsShow(true);
  };

  // Determine which dataset to use based on user type
  const transactionsData = isLandlordOrAgent
    ? data?.data
    : tenantTransactions?.data;

  return (
    <div>
      <div className="flex justify-between gap-2 flex-wrap mb-6">
        <div>
          <h3 className="font-semibold text-lg md:text-xl text-black">
            All Transactions
          </h3>
          <p className="text-[#475367]">
            Here is all the information you need on all your transactions
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
              <ul className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {['All', 'Success', 'Pending', 'Failed'].map((status) => (
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
        </div>
      </div>

      <CustomTable
        headers={transHeaders}
        skeletonRows={3}
        isLoading={isLoading || isLoadingTenantTransations} // Handle loading for both datasets
      >
        {transactionsData?.length ? (
          transactionsData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="whitespace-nowrap px-6 py-4">
                {row?.transactionRef?.slice(0, 20)}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {formatDateTime(row?.createdAt)}
              </td>

              <td className="whitespace-nowrap px-6 py-4">{row?.category}</td>
              <td className="whitespace-nowrap px-6 py-4">
                ₦
                {Number(row?.amount?.$numberDecimal)?.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                  }
                ) || '0.00'}
              </td>

              <td className="whitespace-nowrap px-6 py-4">{row?.type}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <p
                  style={{
                    paddingBlock: '5px',
                    paddingInline: '7px',
                    borderRadius: '55px',
                  }}
                  className={`
                 ${
                   row?.status === 'success'
                     ? 'text-[#036B26] bg-[#E7F6EC] cursor-pointer relative'
                     : row?.status === 'Failed'
                     ? 'text-red-600 bg-[#FFE1E1] cursor-pointer relative'
                     : 'text-yellow-600 bg-yellow-300 cursor-pointer relative'
                 }
                 `}
                >
                  {row.status}
                </p>
              </td>
              <td className="whitespace-nowrap px-6 py-4 relative">
                <button
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm"
                  onClick={() => handleViewDetails(row)}
                >
                  <FiEye className="mr-2" /> View Details
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="text-center py-6">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/emptystate.png"
                  alt="No Transactions"
                  className=" w-32 h-32"
                />
                <p className="text-lg font-semibold text-gray-700">
                  No Transactions Yet
                </p>
              </div>
            </td>
          </tr>
        )}
      </CustomTable>
      <TransactionDetails
        isOpen={isShow}
        onClose={() => setIsShow(false)}
        row={selectedRow}
        details={selectedRow}
      />
    </div>
  );
};
export default Transactions;
