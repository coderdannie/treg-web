import SearchFilters from '../../components/data/web/Properties/SearchFilters.js';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllPublicProperties } from '../../services/query/properties.js';
import PropertyCardSkeleton from '../../components/Loaders/PropertyCardSkeleton.js';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';
import { FcLikePlaceholder } from 'react-icons/fc';
import Pagination from '../../components/common/Pagination.js';

const Properties = () => {
  const storedFilters = JSON.parse(sessionStorage.getItem('propertyFilters'));
  const [currentPage, setCurrentPage] = useState(1); // Add page state
  const itemsPerPage = 25;

  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    propertyType: '',
  });

  useEffect(() => {
    if (storedFilters) {
      setFilters({
        location: storedFilters.location,
        minPrice: storedFilters.minPrice,
        maxPrice: storedFilters.maxPrice,
        propertyType: storedFilters.propertyType,
      });
    }
  }, []);

  const controls = useAnimation();
  const [isLiked] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { filter } = useParams();
  const [meta, setMeta] = useState({
    totalItems: 0,
    totalPages: 0,
    page: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const { data, isLoading } = useGetAllPublicProperties(
    currentPage,
    itemsPerPage,
    filters.location,
    filters.propertyType,
    filters.minPrice,
    filters.maxPrice,
    filter.includes('Insured'),
    filter.includes('Construction')
  );

  useEffect(() => {
    if (data?.meta) {
      setMeta(data.meta);
    }
  }, [data]);

  useEffect(() => {
    if (filter.includes('All')) {
      setFilters({
        location: '',
        minPrice: '',
        maxPrice: '',
        rooms: '',
        propertyType: '',
      });
    }
  }, [filter]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Optional: Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, filter]);

  return (
    <div className="align-element pb-10">
      <SearchFilters filters={filters} setFilters={setFilters} />
      <div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#18181B]">
          Browse New Property Listings
        </h3>
        <div className="mx-auto pt-5">
          <div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))
            ) : data?.data?.length > 0 ? (
              data.data.map((property) => (
                <Link
                  key={property?._id}
                  className="h-full"
                  to={`/properties/property/${property?._id}`}
                >
                  <motion.div className="bg-white rounded-xl h-full shadow-md overflow-hidden text-left cursor-pointer hover:shadow-xl transition-all duration-300 ease-out">
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
                        <span className="text-primary text-lg">•</span>
                        {property?.type}
                      </p>
                      <h3 className="text-xl md:text-2xl font-semibold text-[#101828]">
                        ₦
                        {property
                          ? Number(
                              property?.rentPrice?.$numberDecimal
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })
                          : '0.00'}
                      </h3>
                      <p className="text-gray-600 text-xs gap-2 flex flex-wrap">
                        <span className="font-semibold text-[#475467]">
                          Amenities:
                        </span>{' '}
                        {property?.amenities?.slice(0, 3)?.map((item, i) => (
                          <span key={i}>{`${item}${i !== 2 ? ', ' : ''}`}</span>
                        ))}{' '}
                        {property?.amenities?.length > 3 && '...'}
                      </p>
                      <div className="bg-primary w-full h-[3px] rounded-md my-3"></div>
                      <p className="text-sm text-[#475467] mt-2">
                        {property?.description?.length > 20
                          ? `${property.description.slice(0, 50)}...`
                          : property?.description}
                      </p>
                      <button className="mt-4 py-2 w-full primary-btn">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-600 text-lg">
                  No properties found matching your filters.
                </p>
              </div>
            )}
          </div>

          {/* Add Pagination component */}
          {data?.data?.length > 0 && (
            <div className="mt-8">
              <Pagination meta={meta} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
