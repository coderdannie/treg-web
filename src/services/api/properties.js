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

export const getAllProperties = async ({ queryKey }) => {
  const [, page, limit, start, end, status] = queryKey;

  let query = '';

  if (page) {
    query = query + `page=${page}&`;
  }
  if (limit) {
    query = query + `limit=${limit}&`;
  }
  if (start) {
    query = query + `startDate=${start}&`;
  }

  if (end) {
    query = query + `endDate=${end}&`;
  }
  if (status) {
    query = query + `status=${status}`;
  }

  const res = await axiosInstance.get(`${API.GET_ALL_PROPERTIES}?${query}`);
  return res.data;
};

export const getAllTenantPropertyHistories = async ({ queryKey }) => {
  const [, page, limit, start, end, status] = queryKey;

  let query = '';

  if (page) {
    query = query + `page=${page}&`;
  }
  if (limit) {
    query = query + `limit=${limit}&`;
  }
  if (start) {
    query = query + `startDate=${start}&`;
  }

  if (end) {
    query = query + `endDate=${end}&`;
  }
  if (status) {
    query = query + `status=${status}`;
  }

  const res = await axiosInstance.get(
    `${API.GET_TENANT_PROPERTY_HISTORIES}?${query}`
  );
  return res.data;
};

export const completeListing = async (id) => {
  const res = await axiosInstance.patch(API.COMPLETE_LISTING(id));
  return res.data;
};

export const getAllPublicProperties = async ({ queryKey }) => {
  const [
    ,
    page,
    limit,
    state,
    type,
    minPrice,
    maxPrice,
    insured,
    newConstruction,
    agentId,
    status,
    searchTerm,
  ] = queryKey;

  let query = '';

  if (page) {
    query = query + `page=${page}&`;
  }
  if (limit) {
    query = query + `limit=${limit}&`;
  }

  if (state) {
    query = query + `state=${state}&`;
  }
  if (searchTerm) {
    query = query + `searchTerm=${searchTerm}&`;
  }

  if (type) {
    query = query + `type=${type}&`;
  }

  if (minPrice) {
    query = query + `minPrice=${minPrice}&`;
  }

  if (maxPrice) {
    query = query + `maxPrice=${maxPrice}&`;
  }

  if (insured) {
    query = query + `insured=${insured}&`;
  }

  if (newConstruction) {
    query = query + `newConstruction=${newConstruction}&`;
  }
  if (agentId) {
    query = query + `agentId=${agentId}`;
  }

  if (status) {
    query = query + `status=${status}`;
  }

  const res = await axiosInstance.get(
    `${API.GET_ALL_PUBLIC_PROPERTIES}?${query}`
  );
  return res.data;
};

export const getPublicPropertyDetails = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(
    `${API.GET_PUBLIC_PROPERTY_DETAILS}/${id}/get`
  );
  return res.data;
};

export const getPropertyDetails = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(
    `${API.GET_PUBLIC_PROPERTY_DETAILS}/${id}/get`
  );
  return res.data;
};
export const getPropertiesCountByStatus = async (query) => {
  const res = await axiosInstance.get(API.GET_PROPERTIES_COUNTS(query.id));
  return res.data;
};

export const getAllCounts = async ({ queryKey }) => {
  const [,] = queryKey;
  const res = await axiosInstance.get(API.GET_ALL_COUNTS);
  return res.data;
};

export const updateProperty = async (id, data) => {
  const res = await axiosInstance.patch(API.UPDATE_PROPERTY(id), data);
  return res.data;
};

export const getTenantsCountByStatus = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${API.GET_TENANT_COUNTS}?status=${id}`);
  return res.data;
};
