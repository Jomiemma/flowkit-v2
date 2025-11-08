import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Re-check authentication when location changes or page becomes visible
    const checkAuth = () => {
      if (!isAuthenticated() && location.pathname !== '/login') {
        // Force full page reload to login
        window.location.href = '/login';
      }
    };

    // Check when page becomes visible (handles back button)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuth();
      }
    };

    // Check when user uses browser navigation
    const handleFocus = () => {
      checkAuth();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [location]);

  // Simple auth check - redirect if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
