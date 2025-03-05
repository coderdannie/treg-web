import * as API from '../url';
import axiosInstance from '../axiosInstance';

export const listingPayment = async (body) => {
  const res = await axiosInstance.post(API.LISTING_PAYMENT, body);
  return res.data;
};
