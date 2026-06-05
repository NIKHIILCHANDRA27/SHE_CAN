// c:\Users\chand\Desktop\SHE_Foundation\backend\routes\contactRoutes.js
import express from 'express';
import { body, param, query } from 'express-validator';
import {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  exportContactsCsv,
  getStatusStats,
  getTrend
} from '../controllers/contactController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.post(
  '/',
  [
    body('name').isString().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2 to 100 characters'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('phone').matches(/^[+\d][\d\s-]{9,14}$/).withMessage('Valid phone number is required'),
    body('subject').isString().trim().isLength({ min: 5, max: 150 }).withMessage('Subject must be 5 to 150 characters'),
    body('message').isString().trim().isLength({ min: 20, max: 1000 }).withMessage('Message must be 20 to 1000 characters')
  ],
  validate,
  submitContact
);

router.get(
  '/',
  auth,
  [
    query('page').optional({ checkFalsy: true }).isInt({ min: 1 }).toInt(),
    query('limit').optional({ checkFalsy: true }).isInt({ min: 1 }).toInt(),
    query('status').optional({ checkFalsy: true }).isIn(['Pending', 'Reviewed', 'Resolved']),
    query('sort').optional({ checkFalsy: true }).isIn(['createdAt', 'name', 'status']),
    query('order').optional({ checkFalsy: true }).isIn(['asc', 'desc'])
  ],
  validate,
  getContacts
);

router.get('/export/csv', auth, exportContactsCsv);
router.get('/stats', auth, getStatusStats);
router.get('/trend', auth, getTrend);

router.get('/:id', auth, [param('id').isMongoId().withMessage('Invalid submission ID')], validate, getContactById);

router.put(
  '/:id',
  auth,
  [
    param('id').isMongoId().withMessage('Invalid submission ID'),
    body('status').isIn(['Pending', 'Reviewed', 'Resolved']).withMessage('Status must be Pending, Reviewed, or Resolved')
  ],
  validate,
  updateContactStatus
);

router.delete('/:id', auth, [param('id').isMongoId().withMessage('Invalid submission ID')], validate, deleteContact);

export default router;
