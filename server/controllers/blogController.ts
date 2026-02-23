import { Request, Response } from "express";
import mongoose from "mongoose";
import { BlogPost } from "../models/BlogPost";


export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const { status, category, featured, search } = req.query;

    const filter: any = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === "true";

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const posts = await BlogPost.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    res.json({ success: true, data: posts });
  } catch (error) {
    console.error("Get blog posts error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getBlogPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let post;

    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await BlogPost.findById(id);
    } else {
      post = await BlogPost.findOne({ slug: id });
    }

    if (!post) {
      return res
        .status(404)
        .json({ success: false, error: "Blog post not found" });
    }

    // Increment views safely
    await BlogPost.updateOne({ _id: post._id }, { $inc: { views: 1 } });

    res.json({ success: true, data: post });
  } catch (error) {
    console.error("Get blog post error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const { title, content, status } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, error: "Title and content required" });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({
        success: false,
        error: "Blog post with this title already exists",
      });
    }

    const tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : req.body.tags
        ? [req.body.tags]
        : [];

    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const image = files?.image?.length
      ? `blogs/${files.image[0].filename}`
      : "";

    const newPost = await BlogPost.create({
      title,
      slug,
      excerpt: req.body.excerpt || "",
      content,
      image,
      category: req.body.category || "development",
      tags,
      status: status || "draft",
      featured: req.body.featured === "true",
      readTime,
      views: 0,
      publishedAt: status === "published" ? new Date() : undefined,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Create blog post error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const existingPost = await BlogPost.findById(id);
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, error: "Blog post not found" });
    }

    let slug = existingPost.slug;

    if (req.body.title && req.body.title !== existingPost.title) {
      slug = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const slugExists = await BlogPost.findOne({
        slug,
        _id: { $ne: id },
      });

      if (slugExists) {
        return res.status(400).json({
          success: false,
          error: "Another blog with this title already exists",
        });
      }
    }

    const content = req.body.content || existingPost.content;
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    let coverImage = existingPost.image;
    if (files?.image?.length) {
      coverImage = `blogs/${files.image[0].filename}`;
    }

    const updateData = {
      title: req.body.title || existingPost.title,
      slug,
      excerpt: req.body.excerpt ?? existingPost.excerpt,
      content,
      category: req.body.category || existingPost.category,
      tags: req.body.tags || existingPost.tags,
      status: req.body.status || existingPost.status,
      featured:
        req.body.featured !== undefined
          ? req.body.featured === "true"
          : existingPost.featured,
      image: coverImage,
      readTime,
      views:
        req.body.views !== undefined
          ? Number(req.body.views)
          : existingPost.views,
      publishedAt:
        req.body.status === "published" &&
          existingPost.status !== "published"
          ? new Date()
          : existingPost.publishedAt,
    };

    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json({ success: true, data: updatedPost });
  } catch (error) {
    console.error("Update blog post error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const deleted = await BlogPost.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: "Blog post not found" });
    }

    res.json({
      success: true,
      data: { message: "Blog post deleted successfully" },
    });
  } catch (error) {
    console.error("Delete blog post error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};