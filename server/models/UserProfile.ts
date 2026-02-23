import mongoose, { Schema, Document } from "mongoose";

export interface IUserProfile extends Document {
  userId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  jobTitle: string;
  bio: string;
  location: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  resume?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true },
    bio: { type: String, required: true, maxlength: 500 },
    location: { type: String, required: true },
    website: String,
    github: String,
    linkedin: String,
    twitter: String,
    resume: String,
    avatar: String,
    isPublic: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUserProfile>(
  "UserProfile",
  userProfileSchema
);