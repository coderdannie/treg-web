import { useNavigate } from 'react-router-dom';
import { useGetTenantTransactions } from '../../../services/query/transaction';
import { formatDateTime } from '../../../utils/helper';

import { headers, transHeaders } from '../../common/constants';
import CustomTable from '../../common/CustomTable';
import { FiEye } from 'react-icons/fi';
import { useState } from 'react';
import TransactionDetails from '../../modals/TransactionDetails';

const PaymentHistory = () => {
  const { data, isLoading } = useGetTenantTransactions();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleViewDetails = (row) => {
    setSelectedRow(row);
    setIsOpen(true);
  };

  return (
    <div className="mt-6">
      <div className="bg-[#FFFFFF] pt-5 px-5 border-2 border-[#E4E7EC] rounded-[20px]">
        <div className="flex justify-between pb-3">
          <h4 className="text-[#4D4D4D] font-semibold">Recent Transactions</h4>
          <button
            className="text-[#252525] border-2 border-[#BDBDBD] text-xs py-1 px-2  rounded-md "
            onClick={() => navigate('/transactions')}
          >
            See all
          </button>
        </div>
        <CustomTable
          headers={transHeaders}
          skeletonRows={3}
          isLoading={isLoading}
        >
          {data?.data?.length ? (
            data?.data?.slice(0, 6).map((row, rowIndex) => (
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
      </div>
    </div>
  );
};
export default PaymentHistory;
