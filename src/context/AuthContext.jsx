import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  
  const login = async (userEmail, password) => {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, password }),
      credentials: 'include',
    };
    
    const res = await fetch('/api/users/logon', options);
    const data = await res.json();
    
    if (res.status === 200 && data.name && data.csrfToken) {
      // Success: Update state
      setEmail(data.name);
      setToken(data.csrfToken);
      return { success: true };
    } else {
      // Failure: Return error
      return {
        success: false,
        error: `Authentication failed: ${data?.message}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error during login',
    };
  }
};

const logout = async () => {
  try {
    const res = await fetch('/api/users/logoff', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && {
          'X-CSRF-Token': token,
        }),
      },
    });

    if (res.status === 200) {
      setEmail('');
      setToken('');

      return { success: true };
    }
    setEmail('');
    setToken('');

    return {
      success: false,
      error: 'Logout failed',
    };

  } catch (error) {
    setEmail('');
    setToken('');

    return {
      success: false,
      error: 'Network error during logout',
    };
  }
};

  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}