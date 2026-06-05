// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\services\authService.js
import api from './api.js';

export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const fetchAdminProfile = () => api.get('/auth/me');
