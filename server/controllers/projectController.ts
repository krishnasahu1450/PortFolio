import { Request, Response } from "express";
import mongoose from "mongoose";
import {Project} from "../models/Project";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { status, category, featured } = req.query;

    const filter: any = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === "true";

    const projects = await Project.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.json({ success: true, data: projects });
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let project;

    if (mongoose.Types.ObjectId.isValid(id)) {
      project = await Project.findById(id);
    } else {
      project = await Project.findOne({ slug: id });
    }

    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      demoUrl,
      githubUrl,
      status,
      featured,
      order,
    } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, error: "Title is required" });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existingProject = await Project.findOne({ slug });

    if (existingProject) {
      return res
        .status(400)
        .json({ success: false, error: "Project already exists" });
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const coverImage = files?.image?.length
      ? `projects/${files.image[0].filename}`
      : "";

    const galleryImages = files?.gallery?.length
      ? files.gallery.map((file) => `projects/${file.filename}`)
      : [];

    const tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : req.body.tags
      ? [req.body.tags]
      : [];

    const newProject = await Project.create({
      title,
      slug,
      description: description || "",
      category: category || "",
      demoUrl: demoUrl || "",
      githubUrl: githubUrl || "",
      image: coverImage,
      gallery: galleryImages,
      tags,
      featured: featured === "true",
      order: Number(order) || 0,
      status: status || "draft",
    });

    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid project ID" });
    }

    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    let coverImage = existingProject.image;
    if (files?.image?.length) {
      coverImage = `projects/${files.image[0].filename}`;
    }

    let galleryImages = existingProject.gallery;
    if (files?.gallery?.length) {
      galleryImages = files.gallery.map(
        (file) => `projects/${file.filename}`
      );
    }

    const tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : req.body.tags
      ? [req.body.tags]
      : existingProject.tags;

    const updateData = {
      title: req.body.title ?? existingProject.title,
      description: req.body.description ?? existingProject.description,
      category: req.body.category ?? existingProject.category,
      demoUrl: req.body.demoUrl ?? existingProject.demoUrl,
      githubUrl: req.body.githubUrl ?? existingProject.githubUrl,
      tags,
      image: coverImage,
      gallery: galleryImages,
      featured:
        req.body.featured !== undefined
          ? req.body.featured === "true"
          : existingProject.featured,
      order:
        req.body.order !== undefined
          ? Number(req.body.order)
          : existingProject.order,
      status: req.body.status ?? existingProject.status,
    };

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid ID" });
    }

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }

    res.json({
      success: true,
      data: { message: "Project deleted successfully" },
    });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};