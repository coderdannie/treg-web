import { useNavigate } from 'react-router-dom';

const UpdateKycModal = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();

  const handleUpdateKyc = () => {
    setShowModal(false);
    navigate('/update-kyc');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Your KYC Details</h2>
        <p className="text-gray-600 mb-6">
          To continue using our services, please update your KYC details.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Close
          </button>
          <button
            onClick={handleUpdateKyc}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update KYC
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateKycModal;
