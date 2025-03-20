import { MdWarning } from 'react-icons/md';

export const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            <div className="flex mt-6 flex-col items-center">
              {/* Add the warning icon here */}
              <MdWarning className="text-[3rem] mb-4 text-yellow-500" />
              <h3 className="text-lg font-semibold">Confirm Action</h3>
              <p className="text-[#5E5E5E] mt-2 text-center">
                Are you sure you want to mark this property as "Moved In"? This
                action will notify the property owner, and they will receive the
                funds after confirmation.
              </p>
              <div className="flex gap-4 mt-6">
                <button className="btn btn-outline" onClick={onClose}>
                  Cancel
                </button>
                <button className="btn primary-btn" onClick={onConfirm}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
