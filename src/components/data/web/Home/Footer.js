import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0A36FF] text-white pb-[61px] pt-[49px]">
      <div className="align-element mx-auto px-4 flex flex-col items-center md:items-start">
        {/* Top Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2 text-white"
          >
            <img src="/assets/white-treg.svg" alt="treg logo" />
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col  sm:flex-row gap-3 text-center sm:text-left mt-4 md:mt-0 text-sm">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/properties" className="hover:underline">
              Properties
            </Link>
            <Link to="/agents" className="hover:underline">
              Agents
            </Link>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="w-full  opacity-30 mb-4"></div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs">
          {/* Copyright and Legal Links */}
          <p className="text-center md:text-left">
            © 2024 TREG. All rights reserved
          </p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Use
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-300">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
