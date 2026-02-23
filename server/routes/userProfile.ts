import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { uploadFiles } from "../middleware/upload";
import { deleteMyProfile, getMyProfile, getPublicProfile, upsertUserProfile } from "../controllers/userProfileController";



const router = Router();
const profileUpload = uploadFiles("profiles");

router.post(
    "/",
    authenticateToken,
    profileUpload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "resume", maxCount: 1 },
    ]),
    upsertUserProfile
);

router.get("/me", authenticateToken, getMyProfile);
router.get("/public", getPublicProfile); // alias for /me
router.delete("/", authenticateToken, deleteMyProfile);

export default router;