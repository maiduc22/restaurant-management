import { LoadingOverlay, useMantineTheme } from '@mantine/core';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../config/router';
import AppLayout from '../containers/AppLayout';

const Login = React.lazy(() => import('./Login'));
const Profile = React.lazy(() => import('./Profile'));
const Home = React.lazy(() => import('../components/Home'));
const Menu = React.lazy(() => import('../components/Menu'));
const Orders = React.lazy(() => import('../components/Orders'));
const Tables = React.lazy(() => import('../components/Tables'));
const Staffs = React.lazy(() => import('../components/Staffs'));
const Customers = React.lazy(() => import('../components/Customer'));
const _404NotFound = React.lazy(() => import('../components/common/_404NotFound'));

const AppRoutes: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <Routes>
      <Route
        path={ROUTER.AUTH.LOGIN}
        element={
          <Suspense fallback={<LoadingOverlay visible />}>
            <Login />
          </Suspense>
        }
      />

      <Route path={ROUTER.HOME.INDEX} element={<AppLayout />}>
        <Route path={ROUTER.HOME.INDEX} element={<Home />} />
        <Route path={ROUTER.NAV.MENU.INDEX} element={<Menu />} />
        <Route path={ROUTER.NAV.ORDERS.INDEX} element={<Orders />} />
        <Route path={ROUTER.NAV.TABLES.INDEX} element={<Tables />} />
        <Route path={ROUTER.NAV.CUSTOMERS.INDEX} element={<Customers />} />
        <Route path={ROUTER.NAV.STAFFS.INDEX} element={<Staffs />} />
        <Route
          path={ROUTER.AUTH.PROFILE}
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <Profile />
            </Suspense>
          }
        />
        <Route path="*" element={<_404NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
