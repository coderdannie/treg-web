import { useQuery } from 'react-query';
import { getCountriesStates } from '../api/locations';

export const useGetCountriesStates = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ['COUNTRIES_STATES'],
    getCountriesStates,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};
