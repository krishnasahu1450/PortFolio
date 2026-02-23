import { Router } from "express";
import { authenticateToken, requireAdmin } from "../middleware/auth";
import { uploadFiles } from "../middleware/upload";
import { createTestimonial, deleteTestimonial, getAllTestimonials, getLiveTestimonials, toggleVisibility, updateTestimonial } from "../controllers/testimonialController";

const router = Router();
const testimonialUpload = uploadFiles("profiles");
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  testimonialUpload.single("image"),
  createTestimonial
);

router.get("/", authenticateToken, requireAdmin, getAllTestimonials);

router.get("/live", getLiveTestimonials);

router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  testimonialUpload.single("image"),
  updateTestimonial
);

router.patch("/:id/visibility", authenticateToken, requireAdmin, toggleVisibility);
router.delete("/:id", authenticateToken, requireAdmin, deleteTestimonial);

export default router;