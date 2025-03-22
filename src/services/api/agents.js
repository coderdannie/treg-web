import * as API from '../url';
import axiosInstance, { uploadInstance } from '../axiosInstance';

export const getAllAgents = async () => {
  const res = await axiosInstance.get(API.GET_ALL_AGENTS);
  return res.data;
};

export const getAgent = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${API.GET_AGENT}/${id}/get`);
  return res.data;
};
