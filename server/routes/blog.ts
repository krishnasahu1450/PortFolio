import { Router } from 'express';
import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blogController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { uploadFiles } from '../middleware/upload';

const router = Router();
const blogUpload = uploadFiles("blogs")
// Public routes
router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);

// Admin routes
router.post('/', authenticateToken, requireAdmin, blogUpload.fields([
  { name: "image", maxCount: 1 },       // Cover image
]), createBlogPost);
router.put('/:id', authenticateToken, requireAdmin, blogUpload.fields([
  { name: "image", maxCount: 1 },       // Cover image
]), updateBlogPost);
router.delete('/:id', authenticateToken, requireAdmin, deleteBlogPost);

export default router;