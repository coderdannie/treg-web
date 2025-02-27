import { useMutation, useQuery } from 'react-query';
import { getUser } from '../api/account';

export const useGetUser = (options = {}) => {
  const { data, isLoading, refetch, isError } = useQuery('GET_USER', getUser, {
    ...options,
  });

  return { data, isLoading, refetch, isError };
};
