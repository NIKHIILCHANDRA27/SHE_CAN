// c:\Users\chand\Desktop\SHE_Foundation\backend\config\constants.js
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
export const CLIENT_URLS = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const ADMIN_NAME = process.env.ADMIN_NAME || 'She Can Admin';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@shecan.org';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';
