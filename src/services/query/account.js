import { useMutation, useQuery } from 'react-query';
import {
  addProfessionalDetails,
  addSupportingDocuments,
  createTransactionPin,
  getUser,
  getWalletInfo,
  confirmMovedIn,
  rateLandlordOrAgent,
} from '../api/account';

export const useGetUser = (options = {}) => {
  const { data, isLoading, refetch, isError } = useQuery('GET_USER', getUser, {
    ...options,
  });

  return { data, isLoading, refetch, isError };
};

export const useAddProfessionalDetails = (options = {}) => {
  const { mutate, isLoading } = useMutation(addProfessionalDetails, {
    mutationKey: 'addProfessionalDetails',
    ...options,
  });

  return { mutate, isLoading };
};

export const useAddSupportingDocuments = (options = {}) => {
  const { mutate, isLoading } = useMutation(addSupportingDocuments, {
    mutationKey: 'addSupportingDocuments',
    ...options,
  });

  return { mutate, isLoading };
};

export const useCreateTransactionPin = (options = {}) => {
  const { mutate, isLoading } = useMutation(createTransactionPin, {
    mutationKey: 'addProfessionalDetails',
    ...options,
  });

  return { mutate, isLoading };
};

export const useGetWalletInfo = (options = {}) => {
  const { data, isLoading, refetch, isError } = useQuery(
    'GET_WALLET_INFO',
    getWalletInfo,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch, isError };
};

export const useConfirmMovedIn = (options = {}) => {
  const { mutate, isLoading } = useMutation(
    (payload) => confirmMovedIn(payload.id),
    {
      mutationKey: 'confirmMovedIn',
      ...options,
    }
  );

  return { mutate, isLoading };
};

export const useRateLandlordOrAgent = (options = {}) => {
  const { mutate, isLoading } = useMutation(
    (payload) => rateLandlordOrAgent(payload.id, payload.data),
    {
      mutationKey: 'UPDATE_PRODUCT',
      ...options,
    }
  );

  return { mutate, isLoading };
};
