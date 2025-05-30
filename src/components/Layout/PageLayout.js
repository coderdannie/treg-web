import { useState } from 'react';
import Header from './AuthLayout/Header';
import Sidebar from './AuthLayout/Sidebar';
import SideDrawer from './AuthLayout/SideDrawer';
import Navbar from './NonAuthLayout/Navbar';
import { useLocation } from 'react-router-dom';
import Footer from '../data/web/Home/Footer';
import TenantSidebar from './AuthLayout/TenantSidebar';

export const AuthLayout = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  //   useEffect(() => {
  //     refetch();
  //   }, [pathname]);

  //   useEffect(() => {
  //     const events = [
  //       'mousedown',
  //       'mousemove',
  //       'keydown',
  //       'scroll',
  //       'touchstart',
  //     ];
  //     const resetIdleTimer = () => {
  //       clearTimeout(timeoutId);
  //       timeoutId = setTimeout(() => {
  //         sessionStorage.clear();
  //         window.location.href = '/login';
  //       }, 420000);
  //     };
  //     events.forEach((event) => window.addEventListener(event, resetIdleTimer));

  //     let timeoutId = setTimeout(() => {
  //       sessionStorage.clear();
  //       window.location.href = '/login';
  //     }, 420000);

  //     return () => {
  //       clearTimeout(timeoutId);
  //       events.forEach((event) =>
  //         window.removeEventListener(event, resetIdleTimer)
  //       );
  //     };
  //   }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div
      style={{ fontFamily: '"Inter", serif' }}
      className="min-h-screen relative bg-[#F7F7F7] max-991:overflow-x-hidden"
    >
      {' '}
      {/* <Header /> */}
      {!location.pathname.includes('messages') && (
        <Header setDrawerOpen={setIsDrawerOpen} />
      )}
      <div className=" min-h-screen overflow-x-hidden ">
        <div className="hidden min-991:block">
          {user?.data?.userType === 'Tenant' ? <TenantSidebar /> : <Sidebar />}
        </div>
        <div
          className={`flex-1 ${
            location.pathname.includes('messages')
              ? 'pl-[280px] max-991:pl-[20px] pt-[80px]'
              : 'max-991:pl-[20px] pl-[320px] max-991:pt-[130px] pt-[110px]'
          } max-991:pr-[20px] pr-[48px] flex flex-col`}
        >
          <main className="flex-1 overflow-y-auto pb-8 relative">
            {/* Outlet renders the child routes */}
            {children}
          </main>
        </div>
      </div>
      {isDrawerOpen && (
        <SideDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      )}
    </div>
  );
};

export const NonAuthLayout = ({ children }) => {
  const location = useLocation();

  const routes = [
    '/login',
    '/register',
    '/create-account',
    '/forgot-password',
    '/reset-password',
    '/verify-otp',
    '/update-kyc',
    '/verify-payment',
    '/verify-rent-payment',
    '/review',
  ];

  const shouldHideNavbar = routes.some((route) =>
    location.pathname.includes(route)
  );

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      {children}
      {!shouldHideNavbar && <Footer />}
    </div>
  );
};
