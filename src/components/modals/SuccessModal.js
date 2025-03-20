export const Withdrawal = ({ isOpen, onClose, details }) => {
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

            <div className="text-center">
              <div className="flex justify-center items-center rounded-full w-full">
                <img
                  src="/assets/success.gif"
                  alt="Success"
                  className="w-[150px] h-[150px] object-contain"
                />
              </div>
              <p className="text-[18px] md:text-[20px] text-[#0F172B] font-semibold mt-4">
                Withdrawal Successful
              </p>
              <p className="text-[#444] text-[14px] font-medium mt-2">
                ₦
                {details.amount?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }) || 'N/A'}{' '}
                {''}
                has been credited into your current account.
              </p>
              <button
                className="w-full mt-12 h-12 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => {
                  onClose();
                }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
