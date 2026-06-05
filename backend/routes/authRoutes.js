// c:\Users\chand\Desktop\SHE_Foundation\backend\routes\authRoutes.js
import express from 'express';
import { body } from 'express-validator';
import { login, getMe } from '../controllers/authController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').isString().trim().notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

router.get('/me', auth, getMe);

export default router;
