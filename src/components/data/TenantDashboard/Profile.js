const Profile = ({ data, isLoading }) => {
  return (
    <div className="w-full  bg-white border border-[#E4E7EC] rounded-xl">
      <div className="pt-5 pb-3 pl-5 border-b border-[#E4E7EC]">
        <h4 className="text-[#101928] font-semibold">Your Profile</h4>
      </div>
      <div className="flex flex-col min-h-[122px] md:flex-row px-4">
        <div className="grid flex-1 pt-2 place-items-center">
          <div className="avatar placeholder">
            <div className="ring-primary bg-primary w-[58px] rounded-full ring ">
              {/* {data?.data?.image ? (
                <img src={data?.data?.image} alt="" />
              ) : (
                <span className="text-xl text-white">
                  {data?.data?.firstName?.slice(0, 1)}
                </span>
              )} */}
            </div>
          </div>
        </div>
        <div className="flex-[2] pt-4 pb-8">
          <div className="text-sm    text-[#475367]">
            <div className="flex flex-col sm:flex-row gap-10">
              <div>
                <p>First name</p>
                <p className="font-medium text-[#101928]">
                  {' '}
                  {data?.data?.firstName ?? '--'}
                </p>
              </div>
              <div>
                <p>Last name</p>
                <p className="font-medium text-[#101928]">
                  {' '}
                  {data?.data?.lastName ?? '--'}
                </p>
              </div>
              <div>
                <p>Role</p>
                <p className="font-medium text-[#101928]">Tenant</p>
              </div>
            </div>
          </div>
          <div className="text-sm  pt-4 flex-[2] text-[#475367]">
            <div className="flex flex-col sm:flex-row gap-10">
              {' '}
              <div>
                <p>Tenant ID</p>
                <p className="font-medium text-[#101928]">
                  {data?.data?._id ?? 'N/A'}
                </p>
              </div>
              <div>
                <p>Email</p>
                <p className="font-medium text-[#101928]">
                  {' '}
                  {data?.data?.email ?? '--'}
                </p>
              </div>
              <div>
                <p>Status</p>
                <p className="font-medium w-fit text-[#101928] bg-[#E7F6EC] rounded-lg px-2 py-1">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
