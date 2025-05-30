import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { formatDate } from '../../../utils/helper';
import CustomTable from '../../common/CustomTable';
import toast from 'react-hot-toast';
import { ConfirmationModal } from '../../modals/ConfirmationModal';
import { useConfirmMovedIn } from '../../../services/query/account';
import PropertyDetailsDrawer from '../../modals/PropertiesDetailsDrawer';
import { FaStar } from 'react-icons/fa';

const PropertyHisTable = ({
  data,
  isLoading,
  startRow,
  endRow,
  page,
  setPage,
  setLimit,
  limit,
  refetch,
}) => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null); // State to store selected property

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const navigate = useNavigate();
  const dropdownRefs = useRef({});

  const toggleDropdown = (rowIndex) => {
    setOpenDropdown(openDropdown === rowIndex ? null : rowIndex);
  };

  const handleMovedInConfirmation = (rowId) => {
    setSelectedRowId(rowId);
    setShowConfirmationModal(true);
  };

  const { mutate, isLoading: isConfirming } = useConfirmMovedIn({
    onSuccess: (res) => {
      successToast(res?.message);
      setShowConfirmationModal(false);
      navigate(`/review/${res?.data?.agentId?._id}`);
      refetch();
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const confirmMovedIn = async () => {
    mutate({
      id: selectedRowId,
    });
  };

  // Handle "View Details" button click
  const handleViewDetails = (property) => {
    setSelectedProperty(property); // Store the selected property
    openDrawer(); // Open the drawer
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
    <>
      <CustomTable
        isLoading={isLoading}
        headers={[
          'ID',
          'Property Title',
          'Type',
          'Rent',
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
              <td className="whitespace-nowrap px-6 py-4">
                {row?.propertyId?._id}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {row?.propertyId?.title}
              </td>
              <td className="whitespace-nowrap px-6 py-4">Flat</td>
              <td className="whitespace-nowrap px-6 py-4">
                ₦
                {Number(row.amount?.$numberDecimal)?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                }) || '0.00'}
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
                        : row.status === 'Moved In'
                        ? 'text-blue-600 bg-blue-100 cursor-pointer relative'
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
                      <button
                        className={`flex items-center border-b gap-1 w-full text-left px-4 py-2 ${
                          row.status !== 'Paid'
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={
                          row.status === 'Paid'
                            ? () => handleMovedInConfirmation(row._id)
                            : null
                        }
                        disabled={row.status !== 'Paid'}
                      >
                        <CiEdit />
                        <span>Moved in</span>
                      </button>
                      <button
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleViewDetails(row)} // Handle "View Details" click
                      >
                        <span>View Details</span>
                      </button>
                      {!row?.ratedAgent && (
                        <button
                          className={`flex items-center border-b gap-1 w-full text-left px-4 py-2 ${
                            row.status === 'Paid'
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => {
                            navigate(`/review/${row?.agentId?._id}`);
                          }}
                          disabled={row.status === 'Paid'}
                        >
                          <FaStar />
                          <span>Drop Review</span>
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

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmMovedIn}
        isUpdating={isConfirming}
      />

      <PropertyDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        propertyDetails={selectedProperty}
      />
    </>
  );
};

export default PropertyHisTable;
