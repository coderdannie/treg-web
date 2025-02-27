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
} = PUBLIC_PATHS;

const {
  DASHBOARD,
  PROPERTIES,
  INQUIRES,
  ADD_PROPERTIES,
  ADD_PROPERTY_INFO,
  TRANSACTIONS,
  MESSAGES,
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

//private routes
const Dashboard = WithSuspense(
  lazy(() => import('../pages/Dashboard/Dashboard'))
);
const Inquiries = WithSuspense(
  lazy(() => import('../pages/Inquiries/Inquiries'))
);

const Properties = WithSuspense(
  lazy(() => import('../pages/Properties/Properties'))
);

const AddProperties = WithSuspense(
  lazy(() => import('../pages/Properties/AddProperties'))
);
const AddPropertyInfo = WithSuspense(
  lazy(() => import('../pages/Properties/AddPropertyInfo'))
);

const Transactions = WithSuspense(
  lazy(() => import('../pages/Transactions/Transactions'))
);

const Messages = WithSuspense(lazy(() => import('../pages/Messages/Messages')));

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

  { path: '*', element: <Navigate to="/" replace /> },
];
export const PRIVATE_ROUTES = [
  { path: DASHBOARD, element: <Dashboard /> },
  { path: INQUIRES, element: <Inquiries /> },
  { path: PROPERTIES, element: <Properties /> },
  { path: ADD_PROPERTIES, element: <AddProperties /> },
  { path: ADD_PROPERTY_INFO, element: <AddPropertyInfo /> },
  { path: TRANSACTIONS, element: <Transactions /> },
  { path: MESSAGES, element: <Messages /> },

  { path: '*', element: <Navigate to="/dashboard" replace /> },
];
