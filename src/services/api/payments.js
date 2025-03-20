import * as API from '../url';
import axiosInstance from '../axiosInstance';

export const listingPayment = async (body) => {
  const res = await axiosInstance.post(API.LISTING_PAYMENT, body);
  return res.data;
};

export const verifyPayment = async (body) => {
  const res = await axiosInstance.post(API.VERIFY_PAYMENT, body);
  return res.data;
};

export const verifyPropertyPayment = async (body) => {
  const res = await axiosInstance.post(API.VERIFY_PROPERTY_PAYMENT, body);
  return res.data;
};

export const getBanks = async () => {
  const res = await axiosInstance.get(API.GET_BANKS);
  return res.data;
};

export const resolveName = async (query) => {
  const res = await axiosInstance.get(
    API.ACC_NAME(query.accountNumber, query.bankCode)
  );
  return res.data;
};

export const addAccountDetails = async (body) => {
  const res = await axiosInstance.post(API.ADD_ACCOUNT_DETAILS, body);
  return res.data;
};

export const createPropertyPayment = async (body) => {
  const res = await axiosInstance.post(API.CREATE_PROPERTY_PAYMENT, body);
  return res.data;
};

export const getBankDetails = async () => {
  const res = await axiosInstance.get(API.GET_BANK_DETAILS);
  return res.data;
};

export const withdrawFunds = async (body) => {
  const res = await axiosInstance.post(API.WITHDRAW_FUNDS, body);
  return res.data;
};
