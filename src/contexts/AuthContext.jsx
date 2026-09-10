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

  const [user, setUser] = useState(() => localStorage.getItem('user') || '');
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  
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
      setUser(data.name);
      setToken(data.csrfToken);
      localStorage.setItem('user', data.name);
      localStorage.setItem('token', data.csrfToken);
      return { success: true };
    } else {
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
  if(!token){
    setUser('');
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return { success: true };
  }
  try {
    const res = await fetch('/api/users/logoff', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && {
          'X-CSRF-TOKEN': token,}),
      },
    });

    setUser('');
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    if (res.status === 200) {
      return { success: true };
    }
    return { success: false, error: 'Logout failed'};

  } catch (error) {
    setUser('');
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    return {
      success: false,
      error: 'Network error during logout',
    };
  }
};

  const value = {
    user,
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