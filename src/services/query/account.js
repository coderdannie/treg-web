import { useMutation, useQuery } from 'react-query';
import {
  addProfessionalDetails,
  addSupportingDocuments,
  createTransactionPin,
  getUser,
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
