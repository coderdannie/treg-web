import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { sidebarData } from '../../common/constants'; // Your provided array
import Logo from '../../common/Logo';
import { LuLogOut } from 'react-icons/lu';
import { useLogOut } from '../../../utils/helper';

const SideBar = () => {
  const [isUser] = useState(false);
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
              {sidebarData.map((item, i) => (
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
          className="pb-10 hover:text-red-500  flex justify-between border-[#314169] p-4 text-center text-sm cursor-pointer  "
          onClick={() => action()}
        >
          {' '}
          <div className="flex gap-2 ">
            <div className="avatar placeholder">
              <div className="ring-primary bg-primary w-8 h-8 rounded-full ring ">
                {/* {data?.data?.image ? (
                <img src={data?.data?.image} alt="" />
              ) : (
                <span className="text-xl text-white">
                  {data?.data?.firstName?.slice(0, 1)}
                </span>
              )} */}
              </div>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-sm">Ola Samuel</h4>
              <p className="text-[#475367] hover:text-red-500 text-xs">
                olasamuel@treg.com
              </p>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default SideBar;
