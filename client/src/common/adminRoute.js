import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import AdminLayout from './adminLayout';

const authCheck = () => {
  const token = localStorage.getItem('auth');
  return !!token;
}

const AdminRoute = ({ guard, component: Component, ...rest }) => {
  const route = <Route {...rest} render={matchProps => (
    <AdminLayout>
      <Component {...matchProps} />
    </AdminLayout>
  )} />

  if (!guard) {
    return route;
  } else if (guard && authCheck()) {
    return route;
  } else {
    return <Redirect to="/" />
  }
};

export default AdminRoute;
