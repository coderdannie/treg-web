import { useMutation, useQuery } from 'react-query';
import {
  getAllCharts,
  getSingleChat,
  getSingleChats,
  initiateChat,
} from '../api/chat';

export const useInitiateChat = (options = {}) => {
  const { mutate, isLoading } = useMutation(initiateChat, {
    mutationKey: 'INITIATE_CHAT',
    ...options,
  });

  return { mutate, isLoading };
};

export const useGetAllCharts = (options = {}) => {
  const { data, isLoading, refetch, isError } = useQuery(
    'GET_ALL_CHATS',
    getAllCharts,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch, isError };
};

export const useGetSingleCharts = (id = '', options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ['GET_SINGLE_CHATS', id],
    getSingleChats,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetSingleChat = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getSingleChat, {
    mutationKey: 'getSingleChat',
    ...options,
  });

  return { mutate, isLoading, data };
};
