import React, { useEffect, useState } from 'react';
import { useRoutes, useLocation, Navigate } from 'react-router-dom';
import { AuthLayout, NonAuthLayout } from '../components/Layout/PageLayout';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes';

const Pages = () => {
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem('user'));

  // List of restricted public routes for logged-in users
  const restrictedPublicRoutes = [
    '/login',
    '/register',
    '/create-account',
    '/forgot-password',
    '/reset-password',
    '/verify-otp',
  ];

  // Define public and private routes with their respective layouts
  const routes = useRoutes([
    ...PUBLIC_ROUTES.map((route) => ({
      ...route,
      // Redirect logged-in users away from restricted public routes
      element:
        user && restrictedPublicRoutes.includes(route.path) ? (
          <Navigate to="/dashboard" replace /> // Redirect to a private route
        ) : (
          <NonAuthLayout>{route.element}</NonAuthLayout>
        ),
    })),
    ...(user
      ? PRIVATE_ROUTES.map((route) => ({
          ...route,
          element: <AuthLayout>{route.element}</AuthLayout>,
        }))
      : [
          // Redirect non-logged-in users to login if they try to access private routes
          {
            path: '*',
            element: <Navigate to="/login" replace />,
          },
        ]),
  ]);

  return <>{routes}</>;
};

export default Pages;
