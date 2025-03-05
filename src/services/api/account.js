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
