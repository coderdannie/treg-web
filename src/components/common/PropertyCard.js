import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';
import { FcLikePlaceholder } from 'react-icons/fc';

const PropertyCard = ({
  property,
  isLiked,
  controls,
  cardVariants,
  custom,
}) => {
  return (
    <Link className="h-full" to={`/properties/property/${property?._id}`}>
      <motion.div
        key={property?._id}
        className="bg-white rounded-xl h-full shadow-md overflow-hidden text-left cursor-pointer hover:shadow-xl transition-all duration-300 ease-out"
        custom={custom} // Use the index for staggered animation
        initial="hidden"
        animate={controls} // Use controls to trigger animation
        variants={cardVariants} // Pass variants for animation
      >
        <div className="h-40 relative">
          <img
            src={property?.photos[0]?.photoLink}
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
            <span className="text-primary text-lg">•</span>
            {property?.type}
          </p>
          <h3 className="text-xl md:text-2xl font-semibold text-[#101828]">
            ₦
            {property
              ? Number(property?.pricePerYear?.$numberDecimal).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                  }
                )
              : '0.00'}
          </h3>
          <p className="text-gray-600 text-xs gap-2 flex flex-wrap">
            <span className="font-semibold text-[#475467]">Amenities:</span>{' '}
            {property?.amenities?.slice(0, 3)?.map((item, i) => (
              <div key={i}>{`${item} ${i !== 2 ? ',' : ''}`}</div>
            ))}{' '}
            {property?.amenities?.length > 3 && '...'}
          </p>
          <div className="bg-primary w-full h-[3px] rounded-md my-3"></div>
          <p className="text-sm text-[#475467] mt-2">
            {property?.description?.length > 20
              ? `${property.description.slice(0, 50)}...`
              : property?.description}
          </p>
          <button className="mt-4 py-2 w-full primary-btn">View Details</button>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertyCard;
