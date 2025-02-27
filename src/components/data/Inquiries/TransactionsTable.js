import {
  inquiriesData,
  headers,
  inquiriesHeaders,
} from '../../common/constants';
import { FiMoreVertical } from 'react-icons/fi';
import CustomTable from '../../common/CustomTable';

const TransactionsTable = () => {
  return (
    <CustomTable headers={inquiriesHeaders} skeletonRows={3}>
      {inquiriesData?.length ? (
        inquiriesData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className="whitespace-nowrap px-6 py-4">{row.id}</td>
            <td className="whitespace-nowrap px-6 py-4">{row.name}</td>
            <td className="whitespace-nowrap px-6 py-4">{row.property}</td>
            <td className="whitespace-nowrap px-6 py-4">{row.amount}</td>
            <td className="whitespace-nowrap px-6 py-4">{row.date}</td>
            <td className="whitespace-nowrap px-6 py-4">
              <p
                style={{
                  paddingBlock: '5px',
                  paddingInline: '7px',
                  borderRadius: '55px',
                }}
                className={`
                 ${
                   row.status === 'Approved'
                     ? 'text-[#036B26] bg-[#E7F6EC] cursor-pointer relative'
                     : row.status === 'Rented'
                     ? 'text-red-600 bg-[#FFE1E1] cursor-pointer relative'
                     : 'text-yellow-600 bg-yellow-300 cursor-pointer relative'
                 }
                 `}
              >
                {row.status}
              </p>
            </td>
            <td className="whitespace-nowrap px-6 py-4 ">
              <button className="border-2 border-[#E4E7EC] p-2 rounded">
                <FiMoreVertical />
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
  );
};
export default TransactionsTable;
