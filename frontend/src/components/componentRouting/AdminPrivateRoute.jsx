import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.role === 'Admin' ? <Outlet /> : <Navigate to='/' replace />;
}

export default AdminPrivateRoute;
