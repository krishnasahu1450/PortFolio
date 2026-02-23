import { Router } from 'express';
import { 
  getSkills, 
  createSkill, 
  updateSkill, 
  deleteSkill 
} from '../controllers/skillController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getSkills);

// Admin routes
router.post('/', authenticateToken, requireAdmin, createSkill);
router.put('/:id', authenticateToken, requireAdmin, updateSkill);
router.delete('/:id', authenticateToken, requireAdmin, deleteSkill);

export default router;