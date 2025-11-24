import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUser } from '../services/api';

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Check authentication first
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Get current user
  const user = getUser();
  
  // Check if user has required role
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to user's appropriate dashboard
    const roleDashboards = {
      admin: '/admin',
      hod: '/hod',
      hr: '/hr',
      ged: '/ged',
      employee: '/dashboard',
    };
    
    return <Navigate to={roleDashboards[user.role] || '/dashboard'} replace />;
  }

  return children;
};

export default RoleProtectedRoute;
