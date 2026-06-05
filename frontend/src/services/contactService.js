// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\services\contactService.js
import api from './api.js';

export const submitContact = (contactData) => api.post('/contact', contactData);
export const fetchContacts = (params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params || {}).filter(([, value]) => value !== '' && value != null)
  );
  return api.get('/contact', { params: filteredParams });
};
export const fetchContactById = (id) => api.get(`/contact/${id}`);
export const updateContactStatus = (id, status) => api.put(`/contact/${id}`, { status });
export const deleteContact = (id) => api.delete(`/contact/${id}`);
export const exportContactsCsv = () => api.get('/contact/export/csv', { responseType: 'blob' });
export const fetchStatusStats = () => api.get('/contact/stats');
export const fetchTrend = () => api.get('/contact/trend');
