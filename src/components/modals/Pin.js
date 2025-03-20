import React, { useEffect, useRef } from 'react';
import RICIBs from 'react-individual-character-input-boxes';

const Pin = ({ active, setActive, setPin, pin, action, isLoading }) => {
  const modalRef = useRef(null);

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

  const handleInputChange = (value) => {
    setPin(value);
  };

  return (
    active && (
      <div className="modal modal-open">
        <div className="modal-box relative">
          {' '}
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setActive(false)}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg text-center">
            Enter Transaction Pin
          </h3>
          <div className="flex justify-center my-6">
            <RICIBs
              password
              amount={4}
              autoFocus
              handleOutputString={handleInputChange}
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
              pin.length === 4 ? 'bg-primary' : 'bg-gray-300'
            }`}
            disabled={pin.length !== 4}
            onClick={action}
          >
            {isLoading ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              'Confirm'
            )}
          </button>
        </div>
      </div>
    )
  );
};
export default Pin;
