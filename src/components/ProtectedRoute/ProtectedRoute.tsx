import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const userId = localStorage.getItem('token');
  
  if (userId) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;

