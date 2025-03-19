import PaymentHistory from '../../../components/data/TenantDashboard/PaymentHistory';
import Profile from '../../../components/data/TenantDashboard/Profile';
import { useGetUser } from '../../../services/query/account';

const Dashboard = () => {
  const { data, isLoading } = useGetUser();
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
                <p className="text-gray-700">
                  <strong className="font-medium">Property ID:</strong>{' '}
                  TREG-PROP-78901
                </p>
                <p className="text-gray-700">
                  <strong>Landlord Name:</strong> Grace Adebayo
                </p>
                <p className="text-gray-700">
                  <strong>Lease Start Date:</strong> January 1, 2024
                </p>
                <p className="text-gray-700">
                  <strong>Lease End Date:</strong> December 31, 2024
                </p>
              </div>

              <div className="mt-4 border-t pt-4">
                <h3 className="text-md font-medium">Status</h3>
                <p className="text-gray-700">
                  <strong>Rent Due:</strong> ₦300,000{' '}
                  <span className="text-gray-500">
                    (Next payment: March 1, 2024)
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>Lease Expiry:</strong> 42 days remaining
                </p>
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
