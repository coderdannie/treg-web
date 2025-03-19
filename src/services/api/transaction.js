import * as API from '../url';
import axiosInstance from '../axiosInstance';

export const getAgentTransactions = async ({ queryKey }) => {
  const [, page, limit] = queryKey;

  let query = '';

  if (page) {
    query = query + `page=${page}&`;
  }
  if (limit) {
    query = query + `limit=${limit}&`;
  }

  const res = await axiosInstance.get(`${API.GET_AGENT_TRANSACTIONS}?${query}`);
  return res.data;
};

export const getTenantTransactions = async ({ queryKey }) => {
  const [, page, limit] = queryKey;

  let query = '';

  if (page) {
    query = query + `page=${page}&`;
  }
  if (limit) {
    query = query + `limit=${limit}&`;
  }

  const res = await axiosInstance.get(`${API.TENANT_TRANSACTIONS}?${query}`);
  return res.data;
};
