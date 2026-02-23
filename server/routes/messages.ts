import { Router } from 'express';
import {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage
} from '../controllers/messageController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { contactLimiter } from '../middleware/rate-limit';

const router = Router();

// Public routes
router.post('/', contactLimiter, createMessage);

// Admin routes
router.get('/', authenticateToken, requireAdmin, getMessages);
router.put('/:id', authenticateToken, requireAdmin, updateMessage);
router.delete('/:id', authenticateToken, requireAdmin, deleteMessage);

export default router;