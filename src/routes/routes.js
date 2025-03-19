import { lazy } from 'react';
import { PRIVATE_PATHS, PUBLIC_PATHS } from './constants';
import { Navigate } from 'react-router-dom';
import WithSuspense from '../components/Loaders/WithSupense';

const {
  LOGIN,
  REGISTER,
  RESET_PASS,
  VERIFY_OTP,
  FORGOT_PASS,
  HOME,
  CREATE_ACCOUNT,
  PUBLIC_PROPERTIES,
  AGENTS,
  PUBLIC_PROPERTY_DETAILS,
  VIEW_AGENT,
  ABOUT,
  CONTACT_US,
  UPDATE_KYC,
  PUBLIC_PROPERTY_VIRTUAL_TOUR,
  VERIFY_PAYMENT,
  BLOG,
} = PUBLIC_PATHS;

const {
  DASHBOARD,
  PROPERTIES,
  INQUIRES,
  ADD_PROPERTY_INFO,
  PROPERTY_UPLOADS,
  TRANSACTIONS,
  MESSAGES,
  TENANT_DASHBOARD,
  SETTINGS,
  INSURANCE_DETAILS,
  TENANT_MGT,
  TENANT_PROPERTY,
  VIEW_PROPERTY_DETAILS,
} = PRIVATE_PATHS;

const Login = WithSuspense(lazy(() => import('../pages/Auth/Login')));

const Register = WithSuspense(lazy(() => import('../pages/Auth/Register')));

const CreateAccount = WithSuspense(
  lazy(() => import('../pages/Auth/CreateAccount'))
);

const ResetPassword = WithSuspense(
  lazy(() => import('../pages/Auth/ResetPassword'))
);

const ForgotPassword = WithSuspense(
  lazy(() => import('../pages/Auth/ForgotPassword'))
);
const VerifyOtp = WithSuspense(lazy(() => import('../pages/Auth/VerifyOtp')));

const Home = WithSuspense(lazy(() => import('../pages/Web/Home')));
const PublicProperties = WithSuspense(
  lazy(() => import('../pages/Web/Properties'))
);
const PublicPropertyDetails = WithSuspense(
  lazy(() => import('../pages/Web/PropertyDetails'))
);

const Agents = WithSuspense(lazy(() => import('../pages/Web/Agents')));

const ViewAgent = WithSuspense(lazy(() => import('../pages/Web/ViewAgent')));

const About = WithSuspense(lazy(() => import('../pages/Web/AboutUs')));

const ContactUs = WithSuspense(lazy(() => import('../pages/Web/ContactUs')));

const Blog = WithSuspense(lazy(() => import('../pages/Web/Blog')));

//strictly private routes
const Dashboard = WithSuspense(
  lazy(() => import('../pages/Dashboard/Dashboard'))
);

const TenantDashboard = WithSuspense(
  lazy(() => import('../pages/Tenant/TenantDashboard/Dashboard'))
);
const Inquiries = WithSuspense(
  lazy(() => import('../pages/Inquiries/Inquiries'))
);

const Properties = WithSuspense(
  lazy(() => import('../pages/Properties/Properties'))
);

const AddPropertyInfo = WithSuspense(
  lazy(() => import('../pages/Properties/AddPropertyInfo'))
);

const PropertyUploads = WithSuspense(
  lazy(() => import('../pages/Properties/PropertyUploads'))
);

const ViewPropertyDetails = WithSuspense(
  lazy(() => import('../pages/Properties/ViewPropertyDetails'))
);

const Transactions = WithSuspense(
  lazy(() => import('../pages/Transactions/Transactions'))
);

const Messages = WithSuspense(lazy(() => import('../pages/Messages/Messages')));

const UpdateKyc = WithSuspense(lazy(() => import('../pages/Web/UpdateKyc')));

const VerifyPayment = WithSuspense(
  lazy(() => import('../pages/Web/VerifyPayment'))
);

const PublicPropertiesVirtualTour = WithSuspense(
  lazy(() => import('../pages/Web/VirtualTour'))
);

const Settings = WithSuspense(lazy(() => import('../pages/Settings/Settings')));

const InsuranceDetails = WithSuspense(
  lazy(() => import('../pages/Properties/InsuranceDetails'))
);

const TenantMgt = WithSuspense(
  lazy(() => import('../pages/TenantMgt/TenantMgt'))
);

const TenantProperty = WithSuspense(
  lazy(() => import('../pages/Tenant/Property/Property'))
);

export const PUBLIC_ROUTES = [
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  { path: FORGOT_PASS, element: <ForgotPassword /> },
  { path: RESET_PASS, element: <ResetPassword /> },
  { path: VERIFY_OTP, element: <VerifyOtp /> },
  { path: HOME, element: <Home /> },
  { path: CREATE_ACCOUNT, element: <CreateAccount /> },
  { path: PUBLIC_PROPERTIES, element: <PublicProperties /> },
  { path: PUBLIC_PROPERTY_DETAILS, element: <PublicPropertyDetails /> },
  { path: AGENTS, element: <Agents /> },
  { path: VIEW_AGENT, element: <ViewAgent /> },
  { path: ABOUT, element: <About /> },
  { path: CONTACT_US, element: <ContactUs /> },
  { path: UPDATE_KYC, element: <UpdateKyc /> },
  {
    path: PUBLIC_PROPERTY_VIRTUAL_TOUR,
    element: <PublicPropertiesVirtualTour />,
  },
  { path: VERIFY_PAYMENT, element: <VerifyPayment /> },
  { path: BLOG, element: <Blog /> },

  { path: '*', element: <Navigate to="/" replace /> },
];
export const PRIVATE_ROUTES = [
  { path: DASHBOARD, element: <Dashboard /> },
  { path: TENANT_DASHBOARD, element: <TenantDashboard /> },
  { path: INQUIRES, element: <Inquiries /> },
  { path: PROPERTIES, element: <Properties /> },
  { path: ADD_PROPERTY_INFO, element: <AddPropertyInfo /> },
  { path: PROPERTY_UPLOADS, element: <PropertyUploads /> },
  { path: VIEW_PROPERTY_DETAILS, element: <ViewPropertyDetails /> },
  { path: TRANSACTIONS, element: <Transactions /> },
  { path: MESSAGES, element: <Messages /> },
  { path: INSURANCE_DETAILS, element: <InsuranceDetails /> },
  { path: SETTINGS, element: <Settings /> },
  { path: TENANT_MGT, element: <TenantMgt /> },
  { path: TENANT_PROPERTY, element: <TenantProperty /> },

  { path: '*', element: <Navigate to="/dashboard" replace /> },
];
