import { useMutation, useQuery } from 'react-query';
import {
  addProperty,
  getAllProperties,
  uploadPropertyPhotos,
  uploadPropertyVideos,
  completeListing,
  getAllPublicProperties,
  getPublicPropertyDetails,
  getPropertiesCountByStatus,
} from '../api/properties';

export const useAddProperty = (options = {}) => {
  const { mutate, isLoading } = useMutation(addProperty, {
    mutationKey: 'addProperty',
    ...options,
  });

  return { mutate, isLoading };
};

export const useUploadPropertyPhotos = (options = {}) => {
  const { mutate, isLoading } = useMutation(uploadPropertyPhotos, {
    mutationKey: 'uploadPhotos',
    ...options,
  });

  return { mutate, isLoading };
};

export const useUploadPropertyVideos = (options = {}) => {
  const { mutate, isLoading } = useMutation(uploadPropertyVideos, {
    mutationKey: 'uploadVideos',
    ...options,
  });

  return { mutate, isLoading };
};

export const useGetAllProperties = (
  page = 1,
  limit = '',
  start = '',
  end = '',
  status = '',
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    ['getAllProperties', page, limit, start, end, status],
    getAllProperties,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useCompleteListing = (options = {}) => {
  const { mutate, isLoading } = useMutation(
    (payload) => completeListing(payload.id),
    {
      mutationKey: 'CompleteListing',
      ...options,
    }
  );

  return { mutate, isLoading };
};

export const useGetAllPublicProperties = (options = {}) => {
  const { data, isLoading, refetch, isError } = useQuery(
    'GET_PUBLIC_PROPERTIES',
    getAllPublicProperties,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch, isError };
};

export const useGetPublicProperties = (id = '', options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ['getOneUser', id],
    getPublicPropertyDetails,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetPropertiesByStatus = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPropertiesCountByStatus, {
    mutationKey: 'getPropertiesByStatus',
    ...options,
  });

  return { mutate, isLoading, data };
};
