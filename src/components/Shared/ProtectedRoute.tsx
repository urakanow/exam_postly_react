// ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useContext } from 'react';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children }: { children: ReactNode})  {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    // Redirect to login page with current location as state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;