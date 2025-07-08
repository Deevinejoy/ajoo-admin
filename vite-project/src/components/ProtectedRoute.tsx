import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (loading) {
    // Optionally, render a spinner or null while loading
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  if (!token || !user) {
    // Redirect to login if there's no token or user
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log(user)

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if user's role is not allowed
    if (user.role === 'MAJORCOOPERATIVE') {
      return <Navigate to="/dashboard" replace />;
    } else if (user.role === 'MAJORASSOCIATE') {
      return <Navigate to="/association/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 