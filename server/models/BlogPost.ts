import mongoose, { Document, Schema } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: "development" | "design" | "tech-trends" | "personal";
  tags: string[];
  status: "published" | "draft" | "archived";
  featured: boolean;
  readTime: number;
  views: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: { type: String, default: "" },

    content: { type: String, required: true },

    image: { type: String, default: "" },

    category: {
      type: String,
      enum: ["development", "design", "tech-trends", "personal"],
      required: true,
    },

    tags: [{ type: String }],

    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "draft",
    },

    featured: { type: Boolean, default: false },

    readTime: { type: Number, default: 1 },

    views: { type: Number, default: 0 },

    publishedAt: { type: Date },
  },
  { timestamps: true }
);

BlogPostSchema.index({ status: 1 });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ featured: 1 });
BlogPostSchema.index({ createdAt: -1 });

export const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);