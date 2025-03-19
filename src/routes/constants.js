export const PUBLIC_PATHS = {
  LOGIN: '/login',
  FORGOT_PASS: '/forgot-password',
  VERIFY_PASS_OTP: '/verify-password-otp',
  VERIFY_EMAIL: '/verify-email',
  VERIFY_OTP: '/verify-otp',
  RESET_PASS: '/reset-password',
  REGISTER: '/register',
  CREATE_ACCOUNT: '/create-account',
  PUBLIC_PROPERTIES: '/properties/:filter',
  PUBLIC_PROPERTY_DETAILS: '/properties/property/:id',
  PUBLIC_PROPERTY_VIRTUAL_TOUR: '/properties/property/virtual-tour/:id',
  HOME: '/',
  AGENTS: '/agents',
  VIEW_AGENT: '/agents/:id',
  ABOUT: '/about-us',
  CONTACT_US: '/contact-us',
  UPDATE_KYC: '/update-kyc',
  VERIFY_PAYMENT: '/verify-payment',
  BLOG: '/blog',
};

export const PRIVATE_PATHS = {
  DASHBOARD: '/dashboard',
  PROPERTIES: '/my-properties/:type',
  INQUIRES: '/inquires',
  ADD_PROPERTY_INFO: '/add-property-info',
  PROPERTY_UPLOADS: '/property-uploads',
  VIEW_PROPERTY_DETAILS: '/my-properties/view-details/:id',
  TRANSACTIONS: '/transactions',
  MESSAGES: '/messages',

  INSURANCE_DETAILS: '/insurance-details',
  TENANT_MGT: '/tenant-mgt',
  SETTINGS: '/settings',

  //tenant route
  TENANT_DASHBOARD: '/tenant/dashboard',
  TENANT_PROPERTY: '/tenant/property',
};
