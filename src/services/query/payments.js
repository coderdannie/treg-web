import { useMutation } from 'react-query';
import { listingPayment } from '../api/payments';

export const useListingPayment = (options = {}) => {
  const { mutate, isLoading } = useMutation(listingPayment, {
    mutationKey: 'listingPayment',
    ...options,
  });

  return { mutate, isLoading };
};
