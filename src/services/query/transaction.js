import { useMutation, useQuery } from 'react-query';
import { getAgentTransactions } from '../api/transaction';

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
