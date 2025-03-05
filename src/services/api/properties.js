import * as API from '../url';
import axiosInstance, { uploadInstance } from '../axiosInstance';

export const addProperty = async (body) => {
  const res = await axiosInstance.post(API.ADD_PROPERTY, body);
  return res.data;
};

export const uploadPropertyPhotos = async (body) => {
  const res = await uploadInstance.post(API.UPLOAD_PROPERTY_PHOTOS, body);
  return res.data;
};

export const uploadPropertyVideos = async (body) => {
  const res = await uploadInstance.post(API.UPLOAD_PROPERTY_VIDEOS, body);
  return res.data;
};
