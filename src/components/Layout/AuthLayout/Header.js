import { RiMenu3Line } from 'react-icons/ri';
import { IoNotificationsOutline } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '../../../services/query/account';

const Header = ({ setDrawerOpen }) => {
  const navigate = useNavigate();
  const { data } = useGetUser();

  return (
    <div className="flex flex-col bg-white fixed w-full z-10 max-991:py-[30px] py-5">
      <div className="flex gap-4 justify-between items-center max-991:pl-[30px] pl-[320px]  max-991:pr-[20px] pr-[48px]">
        <div
          className="hidden max-991:block"
          onClick={() => {
            setDrawerOpen(true);
          }}
        >
          <RiMenu3Line className="text-2xl" />
        </div>

        <label className="input h-10 hidden min-991:flex  bg-[#F7F7F7] flex-[1]  items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="grow  "
            placeholder="Search properties by ID, name or location...."
          />
        </label>

        <div className="flex  items-center justify-end flex-1 gap-4">
          {/* Home Icon */}
          <div
            className="cursor-pointer"
            onClick={() => navigate('/')} // Navigate to the root path
          >
            <IoHomeOutline className="text-2xl" /> {/* Home icon */}
          </div>
          <div className="avatar placeholder">
            <div className="bg-[#F0F2F5] w-8 rounded-full text-4xl p-2">
              <IoNotificationsOutline />
            </div>
          </div>
          {data?.data && (
            <div className="avatar placeholder">
              {data?.data ? (
                <div className=" w-10 rounded-full ring ">
                  <img src={data?.data?.avatar} alt={data?.data?.firstName} />
                </div>
              ) : (
                data?.data?.firstName[0]
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
