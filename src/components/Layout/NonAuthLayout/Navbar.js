import { useEffect, useState } from 'react';
import { navItems } from '../../common/constants';
import Logo from '../../common/Logo';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
    navigate(`properties/${subItem.name}`); // Navigate to the selected sub-item
  };

  return (
    <nav
      style={{ boxShadow: '0px 4px 23px rgba(0, 0, 0, 0.07)' }}
      className={`${
        scroll ? 'backdrop-blur-[5px]' : ''
      } nav padding-inline-5 py-7 bg-white left-0 right-0 z-20 border-b-2 border-[#EEF0F3]`}
    >
      <div className="align-element flex justify-between items-center">
        <Logo />
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
                  onClick={() => navigate(item.url)}
                  className="hover:text-gray-900 transition flex items-center gap-1"
                >
                  {item.text}
                </button>
              )}
            </li>
          ))}
        </ul>

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
        <button className="text-primary text-2xl hide-toggle-bar">
          <FaBars />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
