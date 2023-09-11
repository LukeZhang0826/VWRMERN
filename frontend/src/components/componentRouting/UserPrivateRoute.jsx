import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';

const UserPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth );
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default UserPrivateRoute
