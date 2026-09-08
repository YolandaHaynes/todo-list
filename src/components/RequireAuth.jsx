import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page and save the current location
      navigate('/logon', { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // If the user is authenticated, render the children components
  return isAuthenticated ? children : null;
}

export default RequireAuth; 