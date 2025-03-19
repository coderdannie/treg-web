import React, { useState } from 'react';
import { RiEyeLine } from 'react-icons/ri';
import { GoEyeClosed } from 'react-icons/go';
import { useGetWalletInfo } from '../../../services/query/account';
import WalletSkeleton from '../../Loaders/WalletSkeleton';

const Wallet = () => {
  const [showAvailableBalance, setShowAvailableBalance] = useState(false);
  const [showEscrowBalance, setShowEscrowBalance] = useState(false);
  const { data, isLoading } = useGetWalletInfo();

  const toggleAvailableBalance = () => {
    setShowAvailableBalance(!showAvailableBalance);
  };

  const toggleEscrowBalance = () => {
    setShowEscrowBalance(!showEscrowBalance);
  };

  const maskAmount = (amount) =>
    '*'.repeat(Math.floor(amount).toString().length);

  if (isLoading) {
    return <WalletSkeleton />;
  }

  return (
    <div className="bg-primary relative mt-[25px] mb-[27px] py-6 rounded-xl text-white overflow-hidden ">
      <img
        className="absolute right-0 h-full top-0"
        src="/assets/wallet-bg.svg"
        alt="treg background"
      />
      <div className="max-w-[1077px] px-4 mx-auto w-full relative ">
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-3 ">
          <div>
            <div className="pb-4 sm:pb-6">
              <div className="flex gap-6 items-center">
                <h4 className="text-gray-200">Available Balance</h4>
                <button onClick={toggleAvailableBalance} className="text-xl">
                  {showAvailableBalance ? <RiEyeLine /> : <GoEyeClosed />}
                </button>
              </div>
              <p className="text-left text-2xl font-medium">
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-white font-semibold text-xl">
                    ₦{' '}
                    {showAvailableBalance
                      ? data?.data?.mainBalance?.$numberDecimal === '0'
                        ? '0.00'
                        : Math.floor(
                            Number(data?.data?.mainBalance?.$numberDecimal)
                          )?.toLocaleString() || '0.00'
                      : maskAmount(
                          data?.data?.mainBalance?.$numberDecimal?.toString() ||
                            '0.00'
                        )}
                  </span>
                  <span className="text-white">
                    {showAvailableBalance
                      ? data?.data?.mainBalance?.$numberDecimal === '0'
                        ? ''
                        : (
                            Number(data?.data?.mainBalance?.$numberDecimal) -
                            Math.floor(
                              Number(data?.data?.mainBalance?.$numberDecimal)
                            )
                          )
                            .toFixed(2)
                            .slice(1) || ''
                      : '**'}
                  </span>
                </div>
              </p>
            </div>
            <div>
              <div className="flex gap-6 items-center">
                <h4 className="text-gray-200">Escrow Balance</h4>
                <button onClick={toggleEscrowBalance} className="text-xl">
                  {showEscrowBalance ? <RiEyeLine /> : <GoEyeClosed />}
                </button>
              </div>
              <p className="text-left text-2xl font-medium">
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-white font-semibold text-xl">
                    ₦{' '}
                    {showEscrowBalance
                      ? data?.data?.mainBalance?.$numberDecimal === '0'
                        ? '0.00'
                        : Math.floor(
                            Number(data?.data?.mainBalance?.$numberDecimal)
                          )?.toLocaleString() || '0.00'
                      : maskAmount(
                          data?.data?.mainBalance?.$numberDecimal?.toString() ||
                            '0.00'
                        )}
                  </span>
                  <span className="text-white">
                    {showEscrowBalance
                      ? data?.data?.escrow?.$numberDecimal === '0'
                        ? ''
                        : (
                            Number(data?.data?.escrow?.$numberDecimal) -
                            Math.floor(
                              Number(data?.data?.escrow?.$numberDecimal)
                            )
                          )
                            .toFixed(2)
                            .slice(1) || ''
                      : '**'}
                  </span>
                </div>
              </p>
            </div>
          </div>

          <button className="bg-white w-fit mt-2 sm:mt-0 text-primary flex rounded-lg gap-2 items-center py-3 px-5 font-semibold text-sm">
            <img
              src="/assets/money-send-circle.svg"
              className="w-5"
              alt="money send circle"
            />
            <span>Withdraw</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
