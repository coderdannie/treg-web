export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const LOGIN = `${BASE_URL}auth/login`;
export const SIGN_UP = `${BASE_URL}auth/register`;
export const VERIFY_EMAIL = `${BASE_URL}auth/verify-treg-email`;
export const FORGOT_PASSWORD = 'auth/forgot-password';
export const VERIFY_PASS_OTP = 'auth/verify-password-change';
export const CHANGE_PASS = 'auth/change-password';
export const RESEND_PASS_OTP = 'auth/resend-password-reset-otp';
export const RESEND_ACCOUNT_CREATION_OTP = 'auth/resend-account-setup-otp';
export const GET_PROFILE = 'users/get-profile';
export const ADD_PROFESSIONAL_DETAILS = 'users/add-professional-details';
export const ADD_SUPPORTING_DOCUMENTS = 'users/add-supporting-document';
export const COUNTRIES_STATES =
  'https://countriesnow.space/api/v0.1/countries/states';
export const ADD_PROPERTY = 'properties/add';
export const UPLOAD_PROPERTY_PHOTOS = 'media/upload-photos';
export const UPLOAD_PROPERTY_VIDEOS = 'media/upload-videos';
export const LISTING_PAYMENT = 'payments/pay-for-listing';
export const GET_ALL_PROPERTIES = 'properties/all';
export const VERIFY_PAYMENT = 'payments/verify-listing-payment';
export const COMPLETE_LISTING = (id = '') =>
  `properties/complete-listing/${id}`;
