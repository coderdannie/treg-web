import useCustomToast from './useCustomToast';

const ToastProvider = ({ children }) => {
  const { ToastContainer } = useCustomToast();

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default ToastProvider;
