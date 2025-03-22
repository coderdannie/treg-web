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
export const VERIFY_PROPERTY_PAYMENT = 'payments/verify-property-payment';
export const COMPLETE_LISTING = (id = '') =>
  `properties/complete-listing/${id}`;
export const GET_ALL_PUBLIC_PROPERTIES = 'public/properties/all';
export const GET_PUBLIC_PROPERTY_DETAILS = 'public/properties';
export const GET_PROPERTIES_COUNTS = (id) =>
  `properties/count-by-status?status=${id}`;
export const CREATE_TRANSACTION_PIN = 'users/create-pin';
export const GET_AGENT_TRANSACTIONS = 'transactions/agent';
export const GET_ALL_COUNTS = 'properties/count-by-status';
export const GET_BANKS = 'payments/banks/get';
export const ACC_NAME = (accountNumber = '', bankCode = '') =>
  `payments/banks/resolve-account-name?accountNumber=${accountNumber}&bankCode=${bankCode}`;
export const ADD_ACCOUNT_DETAILS = 'payments/bank-account/add';
export const GET_WALLET_INFO = 'users/wallet/get';
export const UPDATE_PROPERTY = (id = '') => `/properties/${id}/update`;
export const GET_TENANT_PROPERTY_HISTORIES = 'properties/tenant/rent-histories';
export const CREATE_PROPERTY_PAYMENT = 'payments/pay-for-property';
export const CONFIRM_MOVED_IN = (id = '') => `payments/move-in/${id}`;
export const TENANT_TRANSACTIONS = 'transactions/tenant';
export const GET_BANK_DETAILS = 'payments/bank-account/get';
export const WITHDRAW_FUNDS = 'payments/withdraw';
export const GET_ALL_AGENTS = 'public/agents/all';
