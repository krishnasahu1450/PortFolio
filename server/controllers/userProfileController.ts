import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import UserProfile from "../models/UserProfile";


declare global {
    namespace Express {
        interface Request {
            user?: { id: string };
        }
    }
}

/* -------------------------------------------------------
   Helper: Delete File Safely
------------------------------------------------------- */
const deleteFileIfExists = (filePath: string) => {
    const fullPath = path.join(process.cwd(), "uploads", filePath);

    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log("Deleted file:", fullPath);
    }
};
/* -------------------------------------------------------
   @desc   Create or Update Profile (Upsert)
   @route  POST /api/profile
   @access Private
------------------------------------------------------- */
export const upsertUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access",
            });
        }

        const {
            firstName,
            lastName,
            jobTitle,
            bio,
            location,
            website,
            github,
            linkedin,
            twitter,
        } = req.body;

        // Basic Required Validation
        if (!firstName || !lastName || !jobTitle || !bio || !location) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
            });
        }

        const existingProfile = await UserProfile.findOne({ userId });

        let avatarPath = existingProfile?.avatar;
        let resumePath = existingProfile?.resume;

        /* ---------------- FILE HANDLING ---------------- */

        if (req.files) {
            const files = req.files as any;

            // Avatar Upload
            if (files.avatar && files.avatar[0]) {
                const newAvatar = `profiles/${files.avatar[0].filename}`;

                // delete old avatar
                if (existingProfile?.avatar) {
                    deleteFileIfExists(existingProfile.avatar);
                }

                avatarPath = newAvatar;
            }

            // Resume Upload
            if (files.resume && files.resume[0]) {
                const newResume = `profiles/${files.resume[0].filename}`;

                // delete old resume
                if (existingProfile?.resume) {
                    console.log("existing file", existingProfile?.resume);

                    deleteFileIfExists(existingProfile.resume);
                }

                resumePath = newResume;
            }
        }

        /* ---------------- SAVE / UPDATE ---------------- */

        const profile = await UserProfile.findOneAndUpdate(
            { userId },
            {
                userId,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                jobTitle: jobTitle.trim(),
                bio: bio.trim(),
                location: location.trim(),
                website: website?.trim() || "",
                github: github?.trim() || "",
                linkedin: linkedin?.trim() || "",
                twitter: twitter?.trim() || "",
                avatar: avatarPath,
                resume: resumePath,
                updatedAt: new Date(),
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: existingProfile
                ? "Profile updated successfully"
                : "Profile created successfully",
            data: profile,
        });
    } catch (error: any) {
        console.error("Profile Upsert Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

/* -------------------------------------------------------
   @desc   Get My Profile
   @route  GET /api/profile/me
   @access Private
------------------------------------------------------- */
export const getMyProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const profile = await UserProfile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

/* -------------------------------------------------------
   @desc   Delete My Profile
   @route  DELETE /api/profile
   @access Private
------------------------------------------------------- */
export const deleteMyProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        const profile = await UserProfile.findOneAndDelete({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        // delete files from disk
        if (profile.avatar) deleteFileIfExists(profile.avatar);
        if (profile.resume) deleteFileIfExists(profile.resume);

        return res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


/* -------------------------------------------------------
   @desc   Get Public Profile (Portfolio Owner)
   @route  GET /api/profile/public
   @access Public
------------------------------------------------------- */

export const getPublicProfile = async (_req: Request, res: Response) => {
    try {
        // const profile = await UserProfile.findOne().sort({ createdAt: 1 });
        const profile = await UserProfile.findOne({ isPublic: true });
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};