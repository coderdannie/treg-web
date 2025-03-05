import { useMutation, useQuery } from 'react-query';
import {
  addProperty,
  uploadPropertyPhotos,
  uploadPropertyVideos,
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
