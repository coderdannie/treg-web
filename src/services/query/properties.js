import { useMutation, useQuery } from 'react-query';
import {
  addProperty,
  getAllProperties,
  uploadPropertyPhotos,
  uploadPropertyVideos,
  completeListing,
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
  page = '1',
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
