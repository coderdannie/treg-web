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

export const getRentals = async ({ queryKey }) => {
  const [, page, limit, start, end, searchTerm] = queryKey;

  let query = '';

  if (page) {
    query = query + `page=${page}&`;
  }
  if (limit) {
    query = query + `limit=${limit}&`;
  }
  if (start) {
    query = query + `startDate=${start}&`;
  }

  if (end) {
    query = query + `endDate=${end}&`;
  }
  if (searchTerm) {
    query = query + `searchTerm=${searchTerm}`;
  }

  const res = await axiosInstance.get(`${API.GET_RENTALS}?${query}`);
  return res.data;
};

export const getAgentRatings = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${API.GET_AGENT_RATINGS}/${id}/rating`);
  return res.data;
};

export const getAgentSales = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${API.GET_AGENT_SALES}/${id}/sales`);
  return res.data;
};
