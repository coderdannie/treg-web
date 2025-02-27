import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { SuccessToast, ErrorToast, WarningToast } from './Notifications';

const useCustomToast = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = (Component, props, duration = 5000) => {
    const id = uuidv4();
    const newToast = { id, Component, props };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const successToast = (message = 'Operation successful') => {
    addToast(SuccessToast, { title: 'Success', message });
  };

  const warningToast = (message = 'Warning: Check this out!') => {
    addToast(WarningToast, { title: 'Warning', message });
  };

  const errorToast = (message = 'An error occurred') => {
    addToast(ErrorToast, { title: 'Error', message });
  };

  const ToastContainer = () =>
    createPortal(
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-item animate-toast-in">
            <toast.Component {...toast.props} />
          </div>
        ))}
      </div>,
      document.body
    );

  return {
    successToast,
    warningToast,
    errorToast,
    ToastContainer,
  };
};

export default useCustomToast;