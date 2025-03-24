import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import CustomTable from '../../common/CustomTable';
import { formatDate } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { CiEdit, CiViewList } from 'react-icons/ci';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useListingPayment } from '../../../services/query/payments';
import toast from 'react-hot-toast';

const TransactionsTable = ({
  data,
  isLoading,
  startRow,
  endRow,
  page,
  setPage,
  setLimit,
  limit,
}) => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const dropdownRefs = useRef({});

  const toggleDropdown = (rowIndex) => {
    setOpenDropdown(openDropdown === rowIndex ? null : rowIndex);
  };

  const handleEdit = (rowId) => {
    navigate(`/my-properties/view-details/${rowId}`);
    sessionStorage.setItem('action', 'edit');
    setOpenDropdown(null);
  };

  const handleViewMore = (rowId) => {
    navigate(`/my-properties/view-details/${rowId}`);
    setOpenDropdown(null);
    sessionStorage.setItem('action', 'view');
  };

  const { mutate, isLoading: isInitializing } = useListingPayment({
    onSuccess: (res) => {
      successToast(res?.message);

      const authUrl = res?.data?.data?.authorization_url;
      localStorage.setItem('paymentType', 'house-listing');
      if (authUrl?.startsWith('http://') || authUrl?.startsWith('https://')) {
        window.location.replace(authUrl); // Redirects user immediately
      } else {
        errorToast('Invalid authorization URL received.');
      }
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const handleActivate = (row) => {
    mutate({
      amount: row?.rentPrice?.$numberDecimal,
      propertyId: row?._id,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown !== null &&
        !dropdownRefs.current[openDropdown]?.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <CustomTable
      isLoading={isLoading}
      headers={[
        'Listing ID',
        'Property Title',
        'Type',
        'Amount',
        'Submission date',
        'Status',
        'Actions',
      ]}
      paginationValues={{
        startRow,
        endRow,
        total: data?.data?.length,
        page: data?.meta?.page,
        pageCount: data?.meta?.totalPages,
        onNext: () =>
          data?.meta?.page !== data?.meta?.totalPages
            ? setPage(page + 1)
            : null,
        onPrevious: () => (data?.meta?.page !== 1 ? setPage(page - 1) : null),
        setLimit,
        limit,
      }}
      useDefaultPagination
      skeletonRows={3}
    >
      {data?.data?.length ? (
        data?.data?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className="whitespace-nowrap px-6 py-4">{row?._id}</td>
            <td className="whitespace-nowrap px-6 py-4">{row?.title}</td>
            <td className="whitespace-nowrap px-6 py-4">Flat</td>
            <td className="whitespace-nowrap px-6 py-4">
              ₦
              {Number(row.rentPrice?.$numberDecimal)?.toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                }
              ) || '0.00'}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {formatDate(row?.createdAt)}
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
                    row.status === 'Available'
                      ? 'text-[#036B26] bg-[#E7F6EC] cursor-pointer relative'
                      : row.status === 'Rented'
                      ? 'text-red-600 bg-[#FFE1E1] cursor-pointer relative'
                      : 'text-yellow-600 bg-yellow-300 cursor-pointer relative'
                  }
                `}
              >
                {row.status === 'Available' ? 'Active' : row.status}
              </p>
            </td>
            <td className="whitespace-nowrap px-6 py-4 relative">
              <div className="relative inline-block">
                <button
                  className="border-2 border-[#E4E7EC] p-2 rounded"
                  onClick={() => toggleDropdown(rowIndex)}
                >
                  <FiMoreVertical />
                </button>
                {openDropdown === rowIndex && (
                  <div
                    ref={(ref) => (dropdownRefs.current[rowIndex] = ref)}
                    className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50"
                  >
                    {row.status !== 'Paid' && row.status !== 'Rented' && (
                      <button
                        className="flex items-center gap-1 w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleEdit(row._id)}
                      >
                        <CiEdit />
                        <span>Edit</span>
                      </button>
                    )}
                    <button
                      className="flex border-t  items-center gap-1 w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleViewMore(row._id)}
                    >
                      <CiViewList />
                      <span>View More</span>
                    </button>
                    {row.status === 'Unlisted' && (
                      <button
                        className="flex border-t items-center gap-1 w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleActivate(row)}
                      >
                        {isInitializing ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : (
                          <IoMdCheckmarkCircleOutline />
                        )}

                        <span>Activate</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={7} className="text-center py-6">
            <div className="flex flex-col items-center">
              <img
                src="/assets/emptystate.png"
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
  );
};

export default TransactionsTable;
