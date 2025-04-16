import * as API from '../url';
import axiosInstance, { uploadInstance } from '../axiosInstance';

export const initiateChat = async (body) => {
  const res = await axiosInstance.post(API.INITIATE_CHAT, body);
  return res.data;
};

export const getAllCharts = async () => {
  const res = await axiosInstance.get(API.GET_ALL_CHATS);
  return res.data;
};

export const composeChats = async (body) => {
  const res = await axiosInstance.post(API.COMPOSE_CHART, body);
  return res.data;
};

export const getSingleChat = async (query) => {
  const res = await axiosInstance.get(API.GET_SINGLE_CHATS(query.id));
  return res.data;
};

export const getSingleChats = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(
    `${API.GET_SINGLE_CHAT}?receiverId=${id}`
  );
  return res.data;
};
