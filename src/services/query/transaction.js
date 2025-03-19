import { useMutation, useQuery } from 'react-query';
import {
  getAgentTransactions,
  getTenantTransactions,
} from '../api/transaction';

export const useGetAgentTransactions = (page = 1, limit = '', options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ['getAgentTransactions', page, limit],
    getAgentTransactions,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetTenantTransactions = (
  page = 1,
  limit = '',
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    ['getTenantTransactions', page, limit],
    getTenantTransactions,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};
