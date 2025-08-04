// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // User is not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render the child routes/components
  return children ? children : <Outlet />;
};

export default ProtectedRoute;