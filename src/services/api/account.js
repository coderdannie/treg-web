import axios from 'axios';
import * as API from '../url';
import axiosInstance from '../axiosInstance';

export const getUser = async () => {
  const res = await axiosInstance.get(API.GET_PROFILE);
  return res.data;
};
