import React, { useEffect, useState } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { AuthLayout, NonAuthLayout } from '../components/Layout/PageLayout';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes';

const PublicRouteWrapper = () => {
  const routes = useRoutes(PUBLIC_ROUTES);
  return routes;
};

const PrivateRouteWrapper = () => {
  const routes = useRoutes(PRIVATE_ROUTES);
  return routes;
};

const Pages = () => {
  const location = useLocation();
  const user = sessionStorage.getItem('user');

  return user ? (
    <AuthLayout>
      <PrivateRouteWrapper key={location.pathname} />
    </AuthLayout>
  ) : (
    <NonAuthLayout>
      <PublicRouteWrapper key={location.pathname} />
    </NonAuthLayout>
  );
};

export default Pages;
