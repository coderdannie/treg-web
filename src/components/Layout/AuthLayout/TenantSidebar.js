import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { tenantSidebarData } from '../../common/constants'; // Your provided array
import Logo from '../../common/Logo';
import { LuLogOut } from 'react-icons/lu';
import { useLogOut } from '../../../utils/helper';
import { useGetUser } from '../../../services/query/account';

const TenantSidebar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: isUserLoading } = useGetUser();

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

      const activeParentItem = tenantSidebarData.find((item) =>
        pathname.includes(item.path)
      )?.title;

      newOpenSubItems[activeParentItem] = true;

      if (name) newOpenSubItems[name] = !prevState[name];

      return newOpenSubItems;
    });
  };

  useEffect(() => {
    handleToggleSubItem(null);
  }, [pathname]);

  const logout = useLogOut();

  const action = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-between fixed z-50 bg-white w-[272px] text-[#101928]">
      <div className="h-screen overflow-auto">
        <div className="bg-white sticky top-0 pl-5 pt-4">
          <Logo />
        </div>

        <div className="p-5">
          {isUserLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="flex-1">
              {tenantSidebarData.map((item, i) => (
                <div key={i} className="mb-2">
                  <div
                    className={`flex items-center px-4 py-3 cursor-pointer rounded-lg transition-colors duration-300 ${
                      (showMenu && currentIndex === item.title) ||
                      pathname.includes(item.path)
                        ? 'bg-[#E7F2FF] text-primary border-[1px] border-primary'
                        : 'bg-transparent text-[#616161] hover:bg-[#E7F2FF] hover:text-primary'
                    }`}
                    onClick={() => {
                      navigate(item.path);
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
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className="pb-10 hover:text-red-500  flex justify-between border-[#314169] p-4 text-center text-sm cursor-pointer  "
          onClick={() => action()}
        >
          {' '}
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

export default TenantSidebar;
