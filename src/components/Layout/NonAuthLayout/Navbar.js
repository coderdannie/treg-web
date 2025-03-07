import { useEffect, useState } from 'react';
import { navItems } from '../../common/constants';
import Logo from '../../common/Logo';
import {
  RiArrowDownSLine,
  RiUserLine,
  RiDashboardLine,
  RiLogoutCircleLine,
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaCheck } from 'react-icons/fa';

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // State for user dropdown
  const isLoggedIn = !!sessionStorage.getItem('user');
  const userType = JSON.parse(sessionStorage.getItem('user'));

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDrawerOpen]);

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
    navigate(`properties/${subItem.name}`);
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
    setIsUserDropdownOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        style={{ boxShadow: '0px 4px 23px rgba(0, 0, 0, 0.07)' }}
        className={`${
          scroll ? 'backdrop-blur-[5px]' : ''
        } nav padding-inline-5 py-7 bg-white left-0 right-0 z-20 border-b-2 border-[#EEF0F3]`}
      >
        <div className="align-element flex justify-between items-center">
          <Logo />
          {/* Desktop Navigation */}
          <ul className="hide-nav-links space-x-8 justify-center text-[#818181] font-medium">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                {item.sub ? (
                  <div className="dropdown dropdown-hover">
                    <label
                      tabIndex={0}
                      className="hover:text-gray-900 transition flex items-center gap-1 cursor-pointer"
                    >
                      {item.text}
                      {item.sub && (
                        <RiArrowDownSLine className="transition-transform duration-300" />
                      )}
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-50 menu p-2 shadow bg-white rounded-box w-52"
                    >
                      {item.sub.map((subItem) => (
                        <li key={subItem.id}>
                          <button
                            className="flex items-center gap-2 w-full text-left"
                            onClick={() => handleSubItemClick(subItem)}
                          >
                            {selectedSubItem?.id === subItem.id && (
                              <FaCheck className="text-green-500" />
                            )}
                            {subItem.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigate(item.url);
                      setIsDrawerOpen(false);
                    }}
                    className="hover:text-gray-900 transition flex items-center gap-1"
                  >
                    {item.text}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons or User Dropdown */}
          <ul className="hide-nav-links items-center gap-3">
            {isLoggedIn ? (
              <li className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center gap-2 text-[#818181] hover:text-gray-900 transition"
                >
                  <RiUserLine className="text-xl" />
                </button>
                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#EEF0F3] rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                      <li>
                        <button
                          onClick={() => {
                            if (userType?.data?.userType === 'Tenant') {
                              navigate('/tenant/dashboard');
                            } else {
                              navigate('/dashboard');
                            }

                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-[#818181] hover:bg-gray-100 hover:text-gray-900 transition"
                        >
                          <RiDashboardLine className="text-lg" />
                          Dashboard
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-[#818181] hover:bg-gray-100 hover:text-gray-900 transition"
                        >
                          <RiLogoutCircleLine className="text-lg" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li>
                  <Link className="secondary-btn" to="/login">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link className="primary-btn" to="/create-account">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Hamburger Menu */}
          <button
            className="text-primary text-2xl lg:hidden"
            onClick={toggleDrawer}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleDrawer}
        ></div>

        {/* Drawer Content */}
        <div className="relative bg-white w-72 h-screen overflow-y-auto">
          <div className="p-5 flex justify-between items-center border-b border-[#EEF0F3]">
            <Logo />
            <button onClick={toggleDrawer} className="text-primary text-2xl">
              <FaTimes />
            </button>
          </div>

          {/* Mobile Navigation */}
          <ul className="p-5 space-y-4">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.sub ? (
                  <div>
                    <button
                      className="hover:text-gray-900 transition flex items-center gap-1 cursor-pointer w-full text-left"
                      onClick={() => toggleDropdown(item.id)}
                    >
                      {item.text}
                      {item.sub && (
                        <RiArrowDownSLine
                          className={`transition-transform duration-300 ${
                            openDropdown === item.id ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>
                    {openDropdown === item.id && (
                      <ul className="pl-4 mt-2 space-y-2">
                        {item.sub.map((subItem) => (
                          <li key={subItem.id}>
                            <button
                              className="flex items-center gap-2 w-full text-left"
                              onClick={() => handleSubItemClick(subItem)}
                            >
                              {selectedSubItem?.id === subItem.id && (
                                <FaCheck className="text-green-500" />
                              )}
                              {subItem.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigate(item.url);
                      setIsDrawerOpen(false);
                    }}
                    className="hover:text-gray-900 transition flex items-center gap-1 w-full text-left"
                  >
                    {item.text}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="p-5 border-t border-[#EEF0F3]">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    if (userType?.data?.userType === 'Tenant') {
                      navigate('/tenant/dashboard');
                    } else {
                      navigate('/dashboard');
                    }

                    setIsDrawerOpen(false);
                  }}
                  className="primary-btn block w-full text-center mb-3"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="secondary-btn block w-full text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="secondary-btn block w-full text-center mb-3"
                  to="/login"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  className="primary-btn block w-full text-center"
                  to="/create-account"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
