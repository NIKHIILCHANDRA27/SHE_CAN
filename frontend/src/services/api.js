// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\services\api.js
import axios from 'axios';

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const baseURL = apiBase.endsWith('/api') ? apiBase : apiBase.replace(/\/$/, '') + '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('she-can-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('she-can-token');
      localStorage.removeItem('she-can-admin');
    }
    return Promise.reject(error);
  }
);

export default api;
