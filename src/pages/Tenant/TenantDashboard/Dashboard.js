import PaymentHistory from '../../../components/data/TenantDashboard/PaymentHistory';
import Profile from '../../../components/data/TenantDashboard/Profile';
import { SkeletonLoader } from '../../../components/Loaders/SkeletonCard';
import { useGetUser } from '../../../services/query/account';
import { useGetAllTenantPropertyHistories } from '../../../services/query/properties';

const Dashboard = () => {
  const { data, isLoading } = useGetUser();

  const {
    data: allProperties,
    isLoading: isLoadingProperty,
    refetch,
  } = useGetAllTenantPropertyHistories();

  // Find the first property with status 'Rented'
  const rentedProperty = allProperties?.data?.find(
    (property) => property.status === 'Rented'
  );

  console.log(rentedProperty); // Log the rented property for debugging

  return (
    <div>
      <div>
        <h3 className="font-semibold text-lg md:text-xl">
          Welcome {data?.data?.firstName || '--'}
        </h3>
        <p className="text-[#475367]">
          Here is all the information you need on TREG today
        </p>
      </div>
      <div className="mt-6">
        <div>
          <div className="max-w-[800px] mb-4 w-full">
            <Profile data={data} isLoading={isLoading} />
          </div>
          <div className="grid md:grid-cols-2 gap-4 ">
            {' '}
            <div className="bg-white border p-4 border-[#E4E7EC] rounded-xl">
              <div className="h-[210px] rounded-xl overflow-hidden">
                <img
                  src="/assets/h1.jpeg"
                  className="object-cover h-full w-full"
                  alt=""
                />
              </div>
              <h2 className="text-xl font-semibold">The Bourdillon House</h2>
              <p className="text-gray-500">
                123, Adetokunbo Street, Allen Avenue, Lagos
              </p>
            </div>
            <div className=" px-6 pb-3 bg-white rounded-lg shadow-md border border-gray-200">
              <div className="mt-4 grid text-sm gap-2 font-medium">
                <h3 className="font-semibold text-base">
                  Current Property Details
                </h3>
                {isLoadingProperty ? (
                  <SkeletonLoader />
                ) : (
                  <div>
                    {rentedProperty ? (
                      <>
                        <p className="text-gray-700">
                          <strong className="font-medium">Property ID:</strong>{' '}
                          {rentedProperty._id || 'N/A'}
                        </p>
                        <p className="text-gray-700">
                          <strong>Title:</strong>{' '}
                          {rentedProperty?.propertyId.title || 'N/A'}
                        </p>
                        <p className="text-gray-700">
                          <strong>Type:</strong>{' '}
                          {rentedProperty?.propertyId?.type || 'N/A'}
                        </p>
                        <p className="text-gray-700">
                          <strong>Location:</strong>{' '}
                          {rentedProperty?.propertyId?.location || 'N/A'}
                        </p>
                        <p className="text-gray-700">
                          <strong>Price Per Year:</strong>
                          {''} ₦
                          {Number(
                            rentedProperty?.propertyId?.pricePerYear
                              ?.$numberDecimal
                          )?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          }) || '0.00'}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-700">No rented property found.</p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 border-t pt-4">
                <h3 className="text-md font-medium">Status</h3>
                {rentedProperty ? (
                  <>
                    <p className="text-gray-700">
                      <strong>Rent Due:</strong> ₦
                      {Number(
                        rentedProperty.pricePerYear?.$numberDecimal
                      )?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      }) || '0.00'}{' '}
                      <span className="text-gray-500">
                        (Next payment: {rentedProperty.nextPaymentDate || 'N/A'}
                        )
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <strong>Lease Expiry:</strong>{' '}
                      {rentedProperty.leaseExpiryDays || '0'} days remaining
                    </p>
                  </>
                ) : (
                  <p className="text-gray-700">No status available.</p>
                )}
              </div>
            </div>
          </div>

          <PaymentHistory />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
