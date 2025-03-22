import { useParams } from 'react-router-dom';
import PropertyCard from '../../components/common/PropertyCard';
import RealEstateProfile from '../../components/data/web/ViewAgent/RealEstateProfile';
import { useGetAgent } from '../../services/query/agents';
import { useGetAllPublicProperties } from '../../services/query/properties';
import { useEffect } from 'react';

const ViewAgent = () => {
  const { id } = useParams();
  const { data: properties } = useGetAllPublicProperties();

  const { data, isLoading } = useGetAgent(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="align-element pt-14">
      <RealEstateProfile data={data} isLoading={isLoading} />
      <div className="mt-[28px] gap-7">
        <div
          className="border-2 border-[#D4D0D0] rounded-md 
          "
        >
          <h3 className="pt-[23px] pb-4 pl-7 border-b-2 border-[#D4D0D0]">
            {' '}
            Property Listed (45 active listings)
          </h3>
          <div className="grid grid-cols-1 px-[26px] pb-14 pt-8  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties?.data?.slice(0, 4).map((property) => (
              <PropertyCard property={property} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ViewAgent;
