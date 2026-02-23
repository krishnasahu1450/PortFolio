import { Router } from 'express';
import { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { uploadFiles } from '../middleware/upload';

const router = Router();
const projectUpload = uploadFiles("projects")
// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Admin routes
router.post('/', authenticateToken, requireAdmin, projectUpload.fields([
    { name: "image", maxCount: 1 },       // Cover image
    { name: "gallery", maxCount: 10 },    // Gallery images
  ]), createProject);
router.put('/:id', authenticateToken, requireAdmin, projectUpload.fields([
    { name: "image", maxCount: 1 },       // Cover image
    { name: "gallery", maxCount: 10 },    // Gallery images
  ]), updateProject);
router.delete('/:id', authenticateToken, requireAdmin, deleteProject);

router.post("/test-upload",
  projectUpload.single("image"),
  (req, res) => {
    console.log(req.file);
    res.json({ file: req.file });
  }
);
export default router;