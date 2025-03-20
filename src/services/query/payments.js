import { useMutation, useQuery } from 'react-query';
import {
  addAccountDetails,
  createPropertyPayment,
  getBankDetails,
  getBanks,
  listingPayment,
  resolveName,
  verifyPayment,
  verifyPropertyPayment,
} from '../api/payments';

export const useListingPayment = (options = {}) => {
  const { mutate, isLoading } = useMutation(listingPayment, {
    mutationKey: 'listingPayment',
    ...options,
  });

  return { mutate, isLoading };
};

export const useCreatePropertyPayment = (options = {}) => {
  const { mutate, isLoading } = useMutation(createPropertyPayment, {
    mutationKey: 'createPropertyPayment',
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

export const useVerifyPropertyPayment = (options = {}) => {
  const { mutate, isLoading } = useMutation(verifyPropertyPayment, {
    mutationKey: 'verifyPayment',
    ...options,
  });

  return { mutate, isLoading };
};

export const useResolveName = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(resolveName, {
    mutationKey: 'resolveName',
    ...options,
  });

  return { mutate, isLoading, data };
};

export const useGetBanks = (options = {}) => {
  const { data, isLoading, refetch } = useQuery('getBanks', getBanks, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useAddAccountDetails = (options = {}) => {
  const { mutate, isLoading } = useMutation(addAccountDetails, {
    mutationKey: 'addAccountDetails',
    ...options,
  });

  return { mutate, isLoading };
};

export const useGetBankDetails = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    'getBankDetails',
    getBankDetails,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};
