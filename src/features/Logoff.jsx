import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [logoutError, setLogoutError] = useState('');
  const [isLoggingOff, setIsLoggingOff] = useState(false);


  async function handleLogout() {
    setLogoutError('');
    setIsLoggingOff(true);

    const result = await logout();
    if (result.success) {
      navigate('/login');
    } else{
      setLogoutError(result.error);
      setIsLoggingOff(false);
    }
  }

  return (
    <div>
      {logoutError && <p>{logoutError}</p>}

      <button
        type="button"
        className="logout-button"
        onClick={handleLogout}
        disabled={isLoggingOff}
      >
        {isLoggingOff ? 'Logging out...' : 'Log Out'}
      </button>
    </div>
  );
}

export default Logoff;
