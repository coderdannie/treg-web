import axios from 'axios';
import * as API from '../url';
import axiosInstance from '../axiosInstance';

export const login = async (body) => {
  const res = await axios.post(API.LOGIN, body);

  return res.data;
};

export const signUp = async (body) => {
  const res = await axios.post(API.SIGN_UP, body);
  return res.data;
};

export const verifyEmail = async (body) => {
  const res = await axiosInstance.patch(API.VERIFY_EMAIL, body);
  return res.data;
};

export const forgotPassword = async (body) => {
  const res = await axiosInstance.patch(API.FORGOT_PASSWORD, body);
  return res.data;
};

export const verifyPasswordOtp = async (body) => {
  const res = await axiosInstance.patch(API.VERIFY_PASS_OTP, body);
  return res.data;
};

export const changePassword = async (body) => {
  const res = await axiosInstance.patch(API.CHANGE_PASS, body);
  return res.data;
};

export const resendPasswordOtp = async (body) => {
  const res = await axiosInstance.patch(API.RESEND_PASS_OTP, body);
  return res.data;
};

export const resendAccountCreationOtp = async (body) => {
  const res = await axiosInstance.patch(API.RESEND_ACCOUNT_CREATION_OTP, body);
  return res.data;
};
