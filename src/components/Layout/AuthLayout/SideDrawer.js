import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { sidebarData, tenantSidebarData } from '../../common/constants'; // Your provided array
import Logo from '../../common/Logo';
import { LuLogOut } from 'react-icons/lu';
import { useLogOut } from '../../../utils/helper';
import { useGetUser } from '../../../services/query/account';

const SideDrawer = ({ isOpen, onClose }) => {
  const { data, isLoading: isUser } = useGetUser();
  const [isLoading, setIsLoading] = useState(false);
  const [openSubItems, setOpenSubItems] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [currentIndex, setCurrentIndex] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleToggleSubItem = (name) => {
    setOpenSubItems((prevState) => {
      const newOpenSubItems = {};

      Object.keys(prevState).forEach((item) => {
        newOpenSubItems[item] = false;
      });

      const activeParentItem = sidebarData.find((item) =>
        pathname.includes(item.path)
      )?.title;

      newOpenSubItems[activeParentItem] = true;

      if (name) newOpenSubItems[name] = !prevState[name];

      return newOpenSubItems;
    });
  };

  const logout = useLogOut();

  const action = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white w-[300px] h-screen overflow-y-auto">
        <div className="bg-white sticky top-0 pl-5 pt-4">
          <Logo />
        </div>

        <div className="p-5">
          {isUser ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-700 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="flex-1">
              {(data?.data?.userType === 'Tenant'
                ? tenantSidebarData
                : sidebarData
              ).map((item, i) => (
                <div key={i} className="mb-2">
                  <div
                    className={`flex items-center px-4 py-3 cursor-pointer rounded-lg transition-colors duration-300 ${
                      (showMenu && currentIndex === item.title) ||
                      pathname.includes(item.path)
                        ? 'bg-[#E7F2FF] text-primary border-[1px] border-primary'
                        : 'bg-transparent text-[#616161] hover:bg-[#E7F2FF] hover:text-primary'
                    }`}
                    onClick={() => {
                      if (item.sub) {
                        setShowMenu((prev) =>
                          prev && currentIndex === item.title ? false : true
                        );
                        setCurrentIndex(item.title);

                        // Automatically navigate to the first sub-item
                        if (!pathname.includes(item.sub[0].path)) {
                          navigate(item.sub[0].path);
                        }
                      } else {
                        navigate(item.path);
                        setShowMenu(false);
                        setCurrentIndex('');
                      }
                    }}
                  >
                    <span className="mr-4">
                      {(showMenu && currentIndex === item.title) ||
                      pathname.includes(item.path)
                        ? item.hover
                        : item.icon}
                    </span>
                    <span className="text-sm">{item.title}</span>
                    {item.sub && (
                      <span className="ml-auto">
                        {showMenu && currentIndex === item.title ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </span>
                    )}
                  </div>

                  {item.sub && showMenu && currentIndex === item.title && (
                    <div className="mt-2 pl-8">
                      {item.sub.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className={`py-2 px-3 rounded-lg text-sm flex items-center gap-2 ${
                            pathname.includes(subItem.path)
                              ? 'text-primary'
                              : 'text-[#757575] hover:text-primary'
                          }`}
                        >
                          {subItem.icon}
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className="pb-10 hover:text-red-500 flex justify-between border-[#314169] p-4 text-center text-sm cursor-pointer"
          onClick={() => action()}
        >
          <div className="flex gap-2 pl-2 ">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 text-[12px]">
                <span className="loading loading-spinner loading-sm "></span>
                Logging Out
              </div>
            ) : (
              <div className="flex items-center text-xl justify-center gap-2 ">
                <LuLogOut />
              </div>
            )}
            {!isLoading && (
              <div className="text-left">
                <h5 className="font-semibold text-sm">
                  {data?.data?.lastName ?? '--'} {data?.data?.firstName ?? '--'}
                </h5>
                <p className="text-[#475367] hover:text-red-500 text-xs">
                  {data?.data?.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
