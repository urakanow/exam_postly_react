import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { useTokenRefresh } from '../../../hooks/UseTokenRefresh';

enum AccessState{
  Checking = "checking",
  Denied = "denied",
  Enabled = "enabled"
}

function ProtectedRoute({ children }: { children: ReactNode})  {
  const { accessToken } = useAuth();
  const location = useLocation();
  const { tryToRefreshToken } = useTokenRefresh();
  const [ accessState, setAccessState ] = useState<AccessState>(AccessState.Checking);

  useEffect(() => {
    const checkToken = async () => {
      setAccessState(AccessState.Checking)
      const refreshResult = await tryToRefreshToken();
      if (refreshResult.success) {
        setAccessState(AccessState.Enabled);
      } else if(refreshResult.expired){
        setAccessState(AccessState.Denied);
      }
    };

    checkToken();
  }, [accessToken])

  switch(accessState){
    case AccessState.Enabled:
      return children;
    case AccessState.Denied:
      return <Navigate to="/login" state={{ from: location }} replace />;
    default:
      return <div>Loading...</div>
  }

}

export default ProtectedRoute;