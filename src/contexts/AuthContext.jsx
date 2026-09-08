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

  const [email, setEmail] = useState(() => localStorage.getItem('email') || '');
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
      setEmail(data.name);
      setToken(data.csrfToken);
      localStorage.setItem('email', data.name);
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
    setEmail('');
    setToken('');
    localStorage.removeItem('email');
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

    setEmail('');
    setToken('');
    localStorage.removeItem('email');
    localStorage.removeItem('token');

    if (res.status === 200) {
      return { success: true };
    }
    return { success: false, error: 'Logout failed'};

  } catch (error) {
    setEmail('');
    setToken('');
    localStorage.removeItem('email');
    localStorage.removeItem('token');

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