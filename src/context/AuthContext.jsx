import http from '../api/http';
import { loginRequest } from '../api/auth';
import { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  
  const refreshProfile = useCallback(async () => {
    try {
      const { data } = await http.get('/me');
      setUser(data);
      return data;
    } catch (error) {
      logout();
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        await refreshProfile();
      }
      setLoading(false);
    };

    initializeAuth();
  }, [refreshProfile]);

  const login = async (email, password) => {
    const { data } = await loginRequest(email, password);

    setToken(data.token);
    localStorage.setItem('token', data.token);

    await refreshProfile();
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      loading,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
