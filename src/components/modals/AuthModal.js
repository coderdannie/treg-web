import { useNavigate } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

const AuthModal = ({ setIsOpen, isOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              ✕
            </button>
            <div className="flex mt-6 flex-col items-center">
              <MdErrorOutline className="text-[5rem] mb-4 text-[#B71C1C]" />
              <p className="text-[#5E5E5E] max-w-[25rem] w-full font-semibold text-center">
                Join Treg to unlock exclusive features! Sign up to list, manage,
                and rent properties seamlessly. Don't miss out on the best tools
                for landlords and tenants.
              </p>
              <button
                className="bg-primary mt-7 text-white font-medium h-[48px] rounded-md w-[80%] md:w-[45%] button"
                onClick={() => {
                  navigate('/create-account');
                }}
              >
                Sign Up Now
              </button>
              <p className="font-medium pt-4 pb-6">
                Already have an account?{' '}
                <span
                  className="underline cursor-pointer font-bold text-primary"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </span>{' '}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AuthModal;
