export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const LOGIN = `${BASE_URL}auth/login`;
export const SIGN_UP = `${BASE_URL}auth/register`;
export const VERIFY_EMAIL = `${BASE_URL}auth/verify-treg-email`;
export const FORGOT_PASSWORD = 'auth/forgot-password';
export const VERIFY_PASS_OTP = 'auth/verify-password-change';
export const CHANGE_PASS = 'auth/change-password';
export const RESEND_PASS_OTP = 'auth/resend-password-reset-otp';
export const RESEND_ACCOUNT_CREATION_OTP = 'auth/resend-account-setup-otp';
export const GET_PROFILE = '/users/get-profile';
export const COUNTRIES_STATES =
  'https://countriesnow.space/api/v0.1/countries/states';
