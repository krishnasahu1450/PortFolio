import { Request, Response } from "express";
import mongoose from "mongoose";
import {Testimonial} from "../models/Testimonial";
import fs from "fs";
import path from "path";

const deleteFileIfExists = (fileName: string) => {
  const fullPath = path.resolve("uploads/testimonials", fileName);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const { name, role, company, content, rating, visibility, status, order } =
      req.body;

    if (!name || !role || !company || !content || !rating) {
      return res
        .status(400)
        .json({ success: false, error: "Required fields missing" });
    }

    const image = req.file ? req.file.filename : "";

    const newTestimonial = await Testimonial.create({
      name: name.trim(),
      role: role.trim(),
      company: company.trim(),
      content: content.trim(),
      rating: Number(rating),
      image,
      visibility: visibility || "show",
      status: status || "pending",
      order: order ? Number(order) : 0,
    });

    res.status(201).json({ success: true, data: newTestimonial });
  } catch (error) {
    console.error("Create testimonial error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getAllTestimonials = async (_req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Get testimonials error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getLiveTestimonials = async (_req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find({
      status: "live",
      visibility: "show",
    })
      .sort({ order: 1 })
      .lean();

    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Get live testimonials error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const existing = await Testimonial.findById(id);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, error: "Testimonial not found" });
    }

    let image = existing.image;

    if (req.file) {
      if (existing.image) {
        deleteFileIfExists(existing.image);
      }
      image = req.file.filename;
    }

    const updated = await Testimonial.findByIdAndUpdate(
      id,
      {
        name: req.body.name ?? existing.name,
        role: req.body.role ?? existing.role,
        company: req.body.company ?? existing.company,
        content: req.body.content ?? existing.content,
        rating:
          req.body.rating !== undefined
            ? Number(req.body.rating)
            : existing.rating,
        visibility: req.body.visibility ?? existing.visibility,
        status: req.body.status ?? existing.status,
        order:
          req.body.order !== undefined
            ? Number(req.body.order)
            : existing.order,
        image,
      },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update testimonial error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const existing = await Testimonial.findById(id);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, error: "Testimonial not found" });
    }

    if (existing.image) {
      deleteFileIfExists(existing.image);
    }

    await Testimonial.findByIdAndDelete(id);

    res.json({
      success: true,
      data: { message: "Testimonial deleted successfully" },
    });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const toggleVisibility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const existing = await Testimonial.findById(id);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, error: "Testimonial not found" });
    }

    const newVisibility =
      existing.visibility === "show" ? "hide" : "show";

    const updated = await Testimonial.findByIdAndUpdate(
      id,
      { visibility: newVisibility },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Toggle visibility error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


