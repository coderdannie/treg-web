import * as API from '../url';
import axiosInstance, { uploadInstance } from '../axiosInstance';

export const getUser = async () => {
  const res = await axiosInstance.get(API.GET_PROFILE);
  return res.data;
};

export const addProfessionalDetails = async (body) => {
  const res = await axiosInstance.post(API.ADD_PROFESSIONAL_DETAILS, body);
  return res.data;
};

export const addSupportingDocuments = async (body) => {
  const res = await uploadInstance.post(API.ADD_SUPPORTING_DOCUMENTS, body);
  return res.data;
};

export const createTransactionPin = async (body) => {
  const res = await axiosInstance.post(API.CREATE_TRANSACTION_PIN, body);
  return res.data;
};

export const getWalletInfo = async () => {
  const res = await axiosInstance.get(API.GET_WALLET_INFO);
  return res.data;
};

export const confirmMovedIn = async (id) => {
  const res = await axiosInstance.post(API.CONFIRM_MOVED_IN(id));
  return res.data;
};

export const rateLandlordOrAgent = async (id, data) => {
  const res = await axiosInstance.post(API.RATE_AGENT_LANDLORD(id), data);
  return res.data;
};
