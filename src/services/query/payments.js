import { useMutation } from 'react-query';
import { listingPayment, verifyPayment } from '../api/payments';

export const useListingPayment = (options = {}) => {
  const { mutate, isLoading } = useMutation(listingPayment, {
    mutationKey: 'listingPayment',
    ...options,
  });

  return { mutate, isLoading };
};

export const useVerifyPayment = (options = {}) => {
  const { mutate, isLoading } = useMutation(verifyPayment, {
    mutationKey: 'verifyPayment',
    ...options,
  });

  return { mutate, isLoading };
};
