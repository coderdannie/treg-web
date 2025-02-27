import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';
import { FcLikePlaceholder } from 'react-icons/fc';

const PropertyCard = ({ property, isLiked, controls, cardVariants }) => {
  return (
    <Link to={`/properties/property/${property.id}`}>
      <motion.div
        key={property.id}
        className="bg-white rounded-xl shadow-md overflow-hidden text-left cursor-pointer  hover:shadow-xl transition-all duration-300 ease-out"
        custom={property.id}
        initial="hidden"
        animate={controls}
        variants={cardVariants}
      >
        <div className="h-40 relative">
          <img
            src={property.image}
            alt="Property"
            className="w-full h-40 object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-white border-2 border-[#E2E8F0] p-2 rounded-md shadow-md">
            {isLiked ? <FcLike /> : <FcLikePlaceholder />}
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm">
            {' '}
            <span className=" text-primary text-lg">•</span>
            {property.type}
          </p>
          <h3 className="text-xl  md:text-2xl font-semibold text-[#101828]">
            {property.price}
          </h3>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-[#475467]">
              {property.beds}
            </span>{' '}
            bed{' '}
            <span className="font-semibold text-[#475467]">
              {property.baths}{' '}
            </span>
            bath
          </p>
          <div className="bg-primary w-full h-[3px] rounded-md my-3"></div>
          <p className="text-sm text-[#475467] mt-2">{property.address}</p>
          <button className="mt-4 py-2 w-full primary-btn">View Details</button>
        </div>
      </motion.div>
    </Link>
  );
};
export default PropertyCard;
