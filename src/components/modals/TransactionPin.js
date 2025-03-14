import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import RICIBs from 'react-individual-character-input-boxes';
import { useCreateTransactionPin } from '../../services/query/account';
import { useNavigate } from 'react-router-dom';

const TransactionPinModal = ({ active, setActive }) => {
  const [createPin, setCreatePin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const modalRef = useRef(null);

  const navigate = useNavigate();

  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const { mutate, isLoading } = useCreateTransactionPin({
    onSuccess: (res) => {
      successToast(res?.message);
      setActive(false); // Close modal on success
      navigate('/dashboard');
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const handleCreatePinComplete = (value) => {
    setCreatePin(value);
  };

  const handleConfirmPinComplete = (value) => {
    setConfirmPin(value);
    if (value.length === 4) {
      setError('');
    } else {
      setError('');
    }
  };

  const handleConfirm = () => {
    if (confirmPin === createPin) {
      mutate({ pin: confirmPin });
    } else {
      setError('The PINs you entered do not match. Please try again.');
      setStep(1);
      setCreatePin('');
      setConfirmPin('');
    }
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActive(false);
      }
    };

    const focusTrap = (e) => {
      if (active && !modalRef.current?.contains(e.target)) {
        modalRef.current?.focus();
      }
    };

    if (active) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
      window.addEventListener('keydown', focusTrap);
    } else {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', focusTrap);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keydown', focusTrap);
    };
  }, [active, setActive]);

  return (
    active && (
      <div
        ref={modalRef}
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
        aria-label="Transaction PIN Modal"
        className="modal modal-open"
      >
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setActive(false)}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg text-center">
            {step === 1 ? 'Create Transaction PIN' : 'Confirm Transaction PIN'}
          </h3>

          {step === 1 && (
            <>
              <div className="flex justify-center my-6">
                <RICIBs
                  password
                  amount={4}
                  autoFocus
                  handleOutputString={handleCreatePinComplete}
                  inputRegExp={/^[0-9]$/}
                  inputProps={{
                    className:
                      'w-16 h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mx-2',
                    type: 'password',
                  }}
                />
              </div>
              {createPin.length === 4 && (
                <div className="flex justify-center mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => setStep(2)}
                  >
                    Confirm Transaction PIN
                  </button>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex justify-center my-6">
                <RICIBs
                  password
                  amount={4}
                  autoFocus
                  handleOutputString={handleConfirmPinComplete}
                  inputRegExp={/^[0-9]$/}
                  inputProps={{
                    className:
                      'w-16 h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mx-2',
                    type: 'password',
                  }}
                />
              </div>
              <button
                type="button"
                className={`py-3 w-full rounded-xl text-white mt-4 ${
                  confirmPin.length === 4 ? 'bg-primary' : 'bg-gray-300'
                }`}
                disabled={confirmPin.length !== 4}
                onClick={handleConfirm}
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  'Confirm'
                )}
              </button>
            </>
          )}

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </div>
    )
  );
};

export default TransactionPinModal;
