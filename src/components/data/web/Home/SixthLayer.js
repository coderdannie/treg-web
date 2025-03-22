import { Link } from 'react-router-dom';
import { agents } from '../../../common/constants';
import { FaPhone } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa6';
import { useGetAllAgents } from '../../../../services/query/agents';

const SixthLayer = () => {
  const user = !!sessionStorage.getItem('user');
  const { data, isLoading } = useGetAllAgents();
  console.log(data);
  return (
    <section className="  lg:pt-10  pb-20 align-element">
      <h3 className="text-lg text-center md:text-left sm:text-xl md:text-2xl font-semibold text-[#18181B] ">
        Meet our Top Ranking Agents
      </h3>
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.slice(0, 4).map((agent) => (
            <div
              key={agent?._id}
              className="bg-white rounded-xl shadow-md overflow-hidden p-4"
            >
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-full object-top   h-40 object-cover rounded-md"
              />
              <div className="mt-4">
                <h3 className="md:text-lg font-semibold text-[#101828]">
                  {agent.firstName} {agent.lastName}
                </h3>
                <p className="text-[#475467] text-sm">Real Estate Agent</p>
                <div className="rounded-md bg-[#A1D8FF] my-4 h-[3px]"></div>
                <div className="mt-2 flex items-center gap-2 text-blue-600">
                  <FaPhone size={16} />
                  <span className="text-[#475467]">Call: {agent.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/agents" className="secondary-btn w-fit mt-7 mx-auto block">
          View all agents
        </Link>
      </div>
      {!user && (
        <div className="bg-[#C8E6FF] p-6 py-10  flex items-center justify-between  mx-auto mt-20 gap-6 flex-col sm:flex-row">
          <div className="flex items-center flex-col sm:flex-row gap-4">
            <div className="bg-white p-3 rounded-full shadow ">
              <FaUsers className="text-blue-600" size={32} />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg  md:text-xl text-[#282828] font-medium pb-1">
                Become An Agent
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Become an agent and unlock a world of opportunities.
              </p>
            </div>
          </div>
          <Link
            to="/create-account"
            className="bg-[#0061E0] text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Join Now
          </Link>
        </div>
      )}
    </section>
  );
};
export default SixthLayer;
