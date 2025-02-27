import { properties } from '../../components/common/constants';
import PropertyCard from '../../components/common/PropertyCard';
import RealEstateProfile from '../../components/data/web/ViewAgent/RealEstateProfile';

const ViewAgent = () => {
  return (
    <section className="align-element pt-14">
      <RealEstateProfile />
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
            {properties.map((property) => (
              <PropertyCard property={property} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ViewAgent;
