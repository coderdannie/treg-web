import { useEffect, useState } from 'react';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { FaTemperatureThreeQuarters } from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';
import AreaChart from './AreaChart';
import { dashboardData } from '../../common/constants';
import { useGetUser, useGetWalletInfo } from '../../../services/query/account';
import { useNavigate } from 'react-router-dom';
import UpdateKycModal from '../../modals/UpdateKyc';
import {
  useGetAllCounts,
  useGetAllPublicProperties,
  useGetPropertiesByStatus,
} from '../../../services/query/properties';
import { PropertyItemSkeleton, SkeletonCard } from '../../Loaders/SkeletonCard';
import Wallet from '../Dashboard/Wallet';
import { Withdrawal } from '../../modals/Withdrawal';
import {
  useGetBankDetails,
  useWithdrawFunds,
} from '../../../services/query/payments';
import Pin from '../../modals/Pin';
import toast from 'react-hot-toast';

const FirstLayer = () => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const { data, isLoading: isLoadingUser, refetch } = useGetUser();
  const [filter, setFilter] = useState('week');
  const [showModal, setShowModal] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [openSuccessModal, setOpenSucessModal] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [pin, setPin] = useState('');

  const { data: allProperties, isLoading: isLoadingProperties } =
    useGetAllPublicProperties();

  const [values, setValues] = useState({
    bankName: '',
    accNumber: '',
    amount: '',
    accName: '',
  });

  const { mutate: mutateWithdraw, isLoading } = useWithdrawFunds({
    onSuccess: (res) => {
      successToast(res?.message);
      setOpenSucessModal(true);
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const handleWithdraw = () => {
    mutateWithdraw({
      amount: Number(values?.amount.replace(/\D/g, '')),
      pin: pin,
    });
  };

  const navigate = useNavigate();
  const { data: walletInfo, isLoading: isLoadingInfo } = useGetWalletInfo();

  const { data: bankDetails } = useGetBankDetails();
  const {
    mutate,
    data: rentedCount,
    isLoading: isLoadingCounts,
  } = useGetPropertiesByStatus();

  const { mutate: mutateUnlisted, data: unlistedCount } =
    useGetPropertiesByStatus();
  const { data: allCount, isLoading: isLoadingAllCounts } = useGetAllCounts();

  const {
    mutate: mutateActiveCounts,
    data: activeCounts,
    isLoading: isLoadingActiveCounts,
  } = useGetPropertiesByStatus();

  useEffect(() => {
    mutateUnlisted({
      id: 'Unlisted',
    });
    mutateActiveCounts({
      id: 'Available',
    });

    mutate({
      id: 'Rented',
    });
  }, [mutate]);

  const isLandlordOrAgent =
    data &&
    (data?.data?.userType === 'Landlord' || data?.data?.userType === 'Agent');

  const isKycCompleted =
    data?.data?.supportingDocumentProvided &&
    data?.data?.professionalDetailsCompleted;

  const inflowFilters = [
    { id: '1', name: 'This Week', value: 'week' },
    { id: '2', name: 'This Month', value: 'month' },
    { id: '3', name: 'This Year', value: 'year' },
  ];
  const dates = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const totals = [50, 100, 150, 200, 250, 300, 350];
  const flow = { data: [] };

  useEffect(() => {
    refetch();
  }, [isKycCompleted]);

  return (
    <div>
      {/* Header Section */}
      {isLandlordOrAgent && !isKycCompleted && (
        <div className="flex mb-2 justify-between max-w-[700px] flex-wrap gap-3 items-center border-2 border-[#EBEBEB] bg-white py-3 px-3 rounded-lg">
          <div className="flex ">
            {' '}
            <img
              src="/assets/markImg.png"
              className="w-[36px]"
              alt="mark icon"
            />
            <div>
              <h2 className="text-sm text-black">
                Update Your KYC to Continue!
              </h2>
              <p className="text-xs text-[#475367] max-w-[450px]">
                For your security and seamless access, we need you to update
                your KYC details. It only takes a few minutes!
              </p>
            </div>
          </div>

          <button
            className="primary-btn !text-xs ml-auto  !px-[6px] h-fit "
            onClick={() => navigate('/update-kyc')}
          >
            Update Kyc
          </button>
        </div>
      )}

      <div className="flex justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-semibold text-lg md:text-xl">
            Welcome {data?.data?.firstName || '--'}
          </h3>
          <p className="text-[#475367]">
            Here is all the information you need on TREG today
          </p>
        </div>

        <button
          className="primary-btn !px-[10px] flex items-center h-fit gap-1"
          onClick={() =>
            isLandlordOrAgent && !isKycCompleted
              ? setShowModal(true)
              : navigate('/add-property-info')
          }
        >
          <MdOutlineAddCircleOutline className="text-2xl" />
          <span>Add New Property</span>
        </button>
      </div>
      {isLandlordOrAgent && isKycCompleted && (
        <Wallet
          setShowModal={setShowWithdrawal}
          data={walletInfo}
          isLoading={isLoadingInfo}
        />
      )}

      {/* Dashboard Cards Section */}
      <div className="flex overflow-x-scroll gap-4 mt-8 dashboard-cards">
        {isLoadingUser ||
        isLoadingCounts ||
        isLoadingAllCounts ||
        isLoadingActiveCounts
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : dashboardData.map((data, i) => (
              <div
                key={i}
                className="w-full min-w-[257px] border border-[#E4E7EC] bg-white p-4 rounded-xl h-full"
              >
                <div className="text-sm h-full">
                  <p className="text-[#344054] font-semibold text-xl">
                    {data.id === 1
                      ? allCount?.count
                      : data?.id === 2
                      ? activeCounts?.count
                      : data?.id === 3
                      ? rentedCount?.count
                      : data?.id === 4
                      ? unlistedCount?.count
                      : '0'}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>{data?.label}</p>
                    <div className="flex justify-center items-center border border-[#E4E7EC] rounded-full w-10 h-10">
                      <FaTemperatureThreeQuarters />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <GoArrowUpRight className="text-green-500" />
                    <p className="text-[#7C8DB5]">+1.01% this week</p>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Activity Section */}
      <div className="flex flex-col md:flex-row mt-4 gap-4">
        <div className="w-full md:w-[60%] h-[368px] ">
          {!flow?.data.length ? (
            <div className="flex-1 h-full bg-white p-6 pb-2 rounded-[12px] shadow-[0px_1px_3px_rgba(16,24,40,0.1),_0px_1px_2px_rgba(16,24,40,0.06)]">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-[#0F172A]">
                  Property Overview
                </p>
                {/* Daisy UI Select Component */}
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="select select-bordered select-sm bg-transparent shadow-none w-auto py-[10px] px-1 cursor-pointer font-medium text-[12px] text-[#2563EB] rounded-[6px]"
                >
                  {inflowFilters.map((data) => (
                    <option key={data.id} value={data.value}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
              {isLoadingUser ||
              isLoadingCounts ||
              isLoadingAllCounts ||
              isLoadingActiveCounts ? (
                <div className="mt-4 flex justify-center">
                  <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
                </div>
              ) : (
                <AreaChart dates={dates} totals={totals} />
              )}
            </div>
          ) : (
            <div className="flex-1 bg-white p-6 pb-2 rounded-[12px] shadow-[0px_1px_3px_rgba(16,24,40,0.1),_0px_1px_2px_rgba(16,24,40,0.06)]">
              <div className="flex flex-col items-center justify-center">
                <img src="/assets/rocket.svg" alt="No data" className="mt-10" />
                <p className="text-[#1E1E1E] mt-4 font-semibold text-[18px] mb-2">
                  No Inflow data
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-[40%]">
          <div className="flex-1 h-full bg-white p-6 pb-2 rounded-[12px] shadow-[0px_1px_3px_rgba(16,24,40,0.1),_0px_1px_2px_rgba(16,24,40,0.06)]">
            <div className=" border-b-2 border-[#E4E7EC] pb-2">
              <p className="font-semibold text-[#0F172A]">
                Best Performing Properties
              </p>
            </div>
            <ul className="grid gap-2 pt-3">
              {isLoadingProperties ? (
                // Skeleton Loading State
                Array.from({ length: 3 }).map((_, index) => (
                  <PropertyItemSkeleton key={index} />
                ))
              ) : allProperties?.data?.length ? (
                // Data Loaded - Display Properties
                allProperties?.data?.slice(0, 3)?.map((dat, i) => (
                  <li
                    className="flex flex-col md:flex-row justify-between border p-[8.5px] border-[#D4D0D0] rounded-[11px] cursor-pointer hover:shadow-md"
                    key={i}
                    onClick={() => navigate(`/properties/property/${dat?._id}`)}
                  >
                    <div className="flex gap-4 mb-2 md:mb-0">
                      <div className="h-[66px] w-[80px] flex-shrink-0 rounded-md overflow-hidden">
                        <img
                          className="object-cover h-full w-full"
                          src={dat?.photos[0]?.photoLink}
                          alt={dat?.title}
                        />
                      </div>

                      <div>
                        <h4 className="font-medium capitalize text-[#616161] text-sm md:text-base">
                          {dat?.title}
                        </h4>

                        <p className="text-[#616161] capitalize text-xs pt-[6px]">
                          {dat?.location}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-1 md:text-right">
                      <span className="block text-xs text-[#036B26] font-medium px-3 bg-[#E7F6EC] py-1 h-fit rounded-[10px] w-fit">
                        For Rent
                      </span>

                      <p className="text-[#616161] font-semibold text-xs md:text-sm">
                        ₦
                        {Number(
                          dat?.pricePerYear?.$numberDecimal
                        )?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        }) || '0.00'}
                        /{dat?.rentalPeriod}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                // Empty State
                <li className="flex justify-center items-center p-4 text-gray-500">
                  <p>No properties found.</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <UpdateKycModal showModal={showModal} setShowModal={setShowModal} />
      <Withdrawal
        isOpen={showWithdrawal}
        details={bankDetails?.data}
        walletInfo={walletInfo}
        values={values}
        setValues={setValues}
        setOpenPinModal={setOpenPinModal}
        onClose={() => setShowWithdrawal(false)}
      />
      <Pin
        active={openPinModal}
        setActive={setOpenPinModal}
        pin={pin}
        setPin={setPin}
        action={handleWithdraw}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FirstLayer;
