import { useEffect, useState } from 'react';
import { navItems } from '../../common/constants';
import Logo from '../../common/Logo';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Added FaTimes for close icon
import { FaCheck } from 'react-icons/fa';

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer visibility
  const [openDropdown, setOpenDropdown] = useState(null); // State for open dropdown

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDrawerOpen]);

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
    navigate(`properties/${subItem.name}`); // Navigate to the selected sub-item
    setIsDrawerOpen(false); // Close the drawer after navigation
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
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
                {/* Parent Menu Item */}
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
                    {/* Dropdown Menu */}
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
                      setIsDrawerOpen(false); // Close drawer on navigation
                    }}
                    className="hover:text-gray-900 transition flex items-center gap-1"
                  >
                    {item.text}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          <ul className="hide-nav-links items-center gap-3">
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
                    {/* Dropdown Menu */}
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
                      setIsDrawerOpen(false); // Close drawer on navigation
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
