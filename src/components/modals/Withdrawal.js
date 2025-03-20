import { useEffect } from 'react';
import { CiBank } from 'react-icons/ci';
import FormInput from '../common/FormInput';
import { CgProfile } from 'react-icons/cg';
import { TbCurrencyNaira } from 'react-icons/tb';
import { BiDollarCircle } from 'react-icons/bi';

export const Withdrawal = ({
  isOpen,
  onClose,
  details,
  walletInfo,
  setOpenPinModal,
  values,
  setValues,
}) => {
  useEffect(() => {
    setValues({
      ...values,
      bankName: details?.bankName,
      accNumber: details?.accountNumber,
      accName: details?.accountName,
    });
  }, [details]);

  const updateTextViews = (event) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Prevent multiple decimal points
    const parts = inputValue.split('.');
    if (parts.length > 2) return;

    // Format the number with commas (only before the decimal point)
    const integerPart = parts[0];
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    );

    const decimalPart = parts[1] !== undefined ? `.${parts[1]}` : '';

    // Combine integer and decimal parts
    const formattedValue = formattedIntegerPart + decimalPart;

    setValues((prevValues) => ({
      ...prevValues,
      amount: formattedValue,
    }));
  };

  const handleWithdraw = () => {
    setOpenPinModal(true);
    onClose();
  };

  const isFormFilled = Object.values(values).every((value) => value);
  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>

            <div className="flex mt-6 flex-col items-center">
              <h3 className="text-lg font-semibold text-[#474747]">
                Withdraw to your bank account
              </h3>
              <div className="grid gap-1 w-full px-2 md:px-4 ">
                <FormInput
                  type="text"
                  readOnly
                  icon={<CiBank />}
                  value={values.bankName}
                />
                <FormInput
                  type="text"
                  readOnly
                  icon={<CgProfile />}
                  value={values.accNumber}
                />
                <FormInput
                  type="text"
                  readOnly
                  icon={<CgProfile />}
                  value={values.accName}
                />
                <FormInput
                  name="amount"
                  type="tel"
                  value={values.amount}
                  inputMode="decimal"
                  pattern="[0-9.,]+"
                  holder="Enter Amount"
                  icon={<TbCurrencyNaira />}
                  onChange={updateTextViews}
                  placeholder="Enter Amount"
                />
              </div>
              <div className="flex flex-col w-full justify-end mt-2 text-sm text-right text-[#474747]">
                <p>
                  Withdrawable Balance:{' '}
                  <span>
                    {' '}
                    ₦
                    {walletInfo?.data?.escrow?.$numberDecimal === '0'
                      ? '0.00'
                      : Math.floor(
                          Number(walletInfo?.data?.escrow?.$numberDecimal)
                        )?.toLocaleString() || '0.00'}
                  </span>
                </p>
                <p>
                  Escrow Balance:{' '}
                  <span>
                    ₦
                    {walletInfo?.data?.mainBalance?.$numberDecimal === '0'
                      ? '0.00'
                      : Math.floor(
                          Number(walletInfo?.data?.mainBalance?.$numberDecimal)
                        )?.toLocaleString() || '0.00'}
                  </span>
                </p>{' '}
              </div>
              <div className="w-full mt-6">
                <button
                  className={`primary-btn flex items-center justify-center w-full ${
                    !isFormFilled
                      ? '!bg-gray-300 !border-0 hover:text-white'
                      : 'bg-primary'
                  }`}
                  disabled={!isFormFilled}
                  onClick={handleWithdraw}
                >
                  <BiDollarCircle size={20} className="font-bold" />
                  <span>Withdraw</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
