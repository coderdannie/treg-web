import { useQuery } from 'react-query';
import { getAllAgents } from '../api/agents';

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
