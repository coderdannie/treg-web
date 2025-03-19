import { formatDate } from '../../../utils/helper';
import CustomTable from '../../common/CustomTable';
import { FiMoreVertical } from 'react-icons/fi';

const TransactionTable = () => {
  const data = [
    {
      id: 'TREG-TN-01234',
      Name: 'Akin Lewis',
      Property: '2-Bedroom Flat, Ikeja',
      MoveInDate: '2024-11-15',
      Duration: '1 year',
      Status: 'Pending Move-in',
    },
    {
      id: 'TREG-TN-01234',
      Name: 'Akin Lewis',
      Property: '2-Bedroom Flat, Ikeja',
      MoveInDate: '2024-11-15',
      Duration: '1 year',
      Status: 'Pending Move-in',
    },
    {
      id: 'TREG-TN-01234',
      Name: 'Akin Lewis',
      Property: '2-Bedroom Flat, Ikeja',
      MoveInDate: '2024-11-15',
      Duration: '1 year',
      Status: 'Pending Review',
    },
    {
      id: 'TREG-TN-01234',
      Name: 'Akin Lewis',
      Property: '2-Bedroom Flat, Ikeja',
      MoveInDate: '2024-11-15',
      Duration: '1 year',
      Status: 'Active',
    },
  ];

  return (
    <div>
      <CustomTable
        // isLoading={isLoading}
        headers={[
          'Tenant ID',
          'Tenant Name',
          'Property',
          'Move in Date',
          'Lease Terms',
          'Status',
          'Actions',
        ]}
        // paginationValues={{
        //   startRow,
        //   endRow,
        //   total: data?.data?.length,
        //   page: data?.meta?.page,
        //   pageCount: data?.meta?.totalPages,
        //   onNext: () =>
        //     data?.meta?.page !== data?.meta?.totalPages
        //       ? setPage(page + 1)
        //       : null,
        //   onPrevious: () => (data?.meta?.page !== 1 ? setPage(page - 1) : null),
        //   setLimit,
        //   limit,
        // }}
        // useDefaultPagination
        // skeletonRows={3}
      >
        {data?.length ? (
          data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="whitespace-nowrap px-6 py-4">{row?.id}</td>
              <td className="whitespace-nowrap px-6 py-4">{row?.Name}</td>
              <td className="whitespace-nowrap px-6 py-4">{row.Property}</td>
              <td className="whitespace-nowrap px-6 py-4">{row.MoveInDate}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {/* {formatDate(row?.createdAt)} */}
                {row.Duration}
              </td>

              <td className="whitespace-nowrap px-6 py-4">
                <p
                  style={{
                    paddingBlock: '5px',
                    paddingInline: '7px',
                    borderRadius: '55px',
                    textAlign: 'center',
                  }}
                  className={`
                 ${
                   row.Status === 'Available'
                     ? 'text-[#036B26] bg-[#E7F6EC] cursor-pointer relative'
                     : row.Status === 'Rented'
                     ? 'text-red-600 bg-[#FFE1E1] cursor-pointer relative'
                     : 'text-yellow-600 bg-yellow-300 cursor-pointer relative'
                 }
                 `}
                >
                  {row.Status === 'Available' ? 'Active' : row.Status}
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
            <td colSpan={7} className="text-center py-6">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/emptystate.png" // Replace with your empty state image
                  alt="No Data"
                  className="w-32 h-32"
                />
                <p className="text-lg font-semibold text-gray-700 mt-4">
                  No Data Available
                </p>
                <p className="text-sm text-gray-500">
                  There are no records to display at the moment.
                </p>
              </div>
            </td>
          </tr>
        )}
      </CustomTable>
    </div>
  );
};
export default TransactionTable;
