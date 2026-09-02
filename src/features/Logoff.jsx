import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

function Logoff() {
  const { logout } = useAuth();

  const [logoutError, setLogoutError] = useState('');
  const [isLoggingOff, setIsLoggingOff] = useState(false);


  async function handleLogout() {
    setLogoutError('');
    setIsLoggingOff(true);

    try {
      const result = await logout();

      if (!result.success) {
        setLogoutError(result.error);
      }
    } catch (error) {
      setLogoutError('Unexpected error during logout');
    } finally {
      setIsLoggingOff(false);
    }
  }

  return (
    <div>
      {logoutError && <p>{logoutError}</p>}

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOff}
      >
        {isLoggingOff ? 'Logging out...' : 'Log Out'}
      </button>
    </div>
  );
}

export default Logoff;
