import { Router } from "express";
import {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  reorderExperiences,
} from "../controllers/experienceController";
import { authenticateToken, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getExperiences);
router.get("/:id", getExperience);

router.post("/", authenticateToken, requireAdmin, createExperience);
router.put("/:id", authenticateToken, requireAdmin, updateExperience);
router.delete("/:id", authenticateToken, requireAdmin, deleteExperience);
router.put(
  "/reorder",
  authenticateToken,
  requireAdmin,
  reorderExperiences
);

export default router;
