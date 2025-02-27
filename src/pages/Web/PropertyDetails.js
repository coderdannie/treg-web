import { IoChevronBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import PropertyCarousel from '../../components/data/web/Properties/PropertyCarousel';
import SecondLayer from '../../components/data/web/Properties/SecondLayer';

const PropertyDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="align-element pt-8">
      <button
        className="flex items-center gap-2 font-medium"
        onClick={() => navigate(-1)}
      >
        <IoChevronBackSharp /> <span>Back</span>
      </button>

      <h3 className="text-lg  sm:text-xl md:text-2xl font-semibold text-[#18181B] mt-[24px] mb-5">
        Property Details
      </h3>
      <PropertyCarousel />

      <SecondLayer />
    </div>
  );
};
export default PropertyDetails;
