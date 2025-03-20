import { useEffect } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import PropertyCarousel from '../../components/data/web/Properties/PropertyCarousel';
import SecondLayer from '../../components/data/web/Properties/SecondLayer';
import { useGetPublicProperties } from '../../services/query/properties';
import VirtualTour from './VirtualTour';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetPublicProperties(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <VirtualTour data={data} />
      {/* <PropertyCarousel data={data} /> */}
      <p className="pt-3 font-medium text-sm">
        This property is insured by {data?.data?.insuranceCompany}
      </p>
      <SecondLayer data={data?.data} />
    </div>
  );
};
export default PropertyDetails;
