import { useQuery } from 'react-query';
import {
  getAgent,
  getAgentRatings,
  getAgentSales,
  getAllAgents,
  getRentals,
} from '../api/agents';

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

export const useGetAllRentals = (
  page = 1,
  limit = '',
  start = '',
  end = '',
  searchTerm = '',
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    ['getAllTenantProperties', page, limit, start, end, searchTerm],
    getRentals,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetAgentRatings = (id = '', options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ['getAgentRatings', id],
    getAgentRatings,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetAgentSales = (id = '', options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ['getAgentSales', id],
    getAgentSales,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};
