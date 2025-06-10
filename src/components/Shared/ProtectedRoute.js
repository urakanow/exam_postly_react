// ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function ProtectedRoute({ children }) {
  const { accessToken } = useContext(AuthContext);
  const location = useLocation();

  if (!accessToken) {
    // Redirect to login page with current location as state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;