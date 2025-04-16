import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdCloseCircle } from 'react-icons/io';
import { formatDateTime } from '../../utils/helper';

const TransactionDetails = ({ isOpen, onClose, details }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={onClose} // Close modal on overlay click
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Transaction details</h2>
              <button
                onClick={onClose}
                className="text-gray-500 flex items-center gap-2"
              >
                <IoMdCloseCircle />
                Close
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3 mb-4">
              {/* <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="font-semibold">AD</span>
              </div>
              <div>
                <p className="text-lg font-semibold">#30,000.00</p>
                <p className="text-sm text-gray-600">Anita Davies</p>
              </div> */}
            </div>

            {/* Details */}
            <div className="space-y-2">
              <DetailRow
                label="Amount"
                value={`₦${
                  Number(details?.amount?.$numberDecimal)?.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                    }
                  ) || '0.00'
                }`}
              />
              <DetailRow
                label="Balance before"
                value={`₦${
                  Number(
                    details?.balanceBefore?.$numberDecimal
                  )?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  }) || '0.00'
                }`}
              />{' '}
              <DetailRow
                label="Balance After"
                value={`₦${
                  Number(details?.balanceAfter?.$numberDecimal)?.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                    }
                  ) || '0.00'
                }`}
              />
              <DetailRow
                label="Date"
                value={formatDateTime(details?.createdAt)}
              />
              <DetailRow label="Category" value={details?.category} />
              {/* <DetailRow label="Account Number" value="328177366363" />
              <DetailRow label="Bank Name" value="Access Bank" /> */}
              <DetailRow label="Type" value={details?.type} />
              <DetailRow
                label="Transaction ID"
                value={details?.transactionRef}
              />
              <DetailRow label="Description" value={details?.description} />
              <DetailRow label="Status" value={details?.status} />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg">
                Report Transaction
              </button>
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                Share Receipt
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Reusable Detail Row Component
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

export default TransactionDetails;
