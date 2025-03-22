import { useQuery } from 'react-query';
import { getAgent, getAllAgents } from '../api/agents';

export const useGetAllAgents = (options = {}) => {
  const { data, isLoading, refetch, isError } = useQuery(
    'GET_ALL_AGENTS',
    getAllAgents,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch, isError };
};

export const useGetAgent = (id = '', options = {}) => {
  const { data, isLoading, refetch } = useQuery(['getAgent', id], getAgent, {
    ...options,
  });

  return { data, isLoading, refetch };
};
