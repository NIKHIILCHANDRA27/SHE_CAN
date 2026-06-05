// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\context\AuthContext.jsx
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('she-can-token');
    const storedAdmin = localStorage.getItem('she-can-admin');
    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const currentToken = token || localStorage.getItem('she-can-token');
      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      }
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          clearSession();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [token, navigate]);

  const setSession = (authToken, adminData) => {
    localStorage.setItem('she-can-token', authToken);
    localStorage.setItem('she-can-admin', JSON.stringify(adminData));
    setToken(authToken);
    setAdmin(adminData);
  };

  const clearSession = () => {
    localStorage.removeItem('she-can-token');
    localStorage.removeItem('she-can-admin');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, setSession, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
};
