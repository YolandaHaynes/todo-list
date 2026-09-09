import { useLocation, useNavigate} from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  console.log('RequireAuth render, isAuthenticated:', isAuthenticated);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated ? children : <div>Loading...</div>;
}

export default RequireAuth; 