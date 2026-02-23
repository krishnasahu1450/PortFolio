import { Request, Response } from "express";
import mongoose from "mongoose";
import {Experience} from "../models/Experience";

export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find({})
      .sort({ order: 1, startDate: -1 })
      .lean();

    res.json({ success: true, data: experiences });
  } catch (error) {
    console.error("Get experiences error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({ success: false, error: "Not found" });
    }

    res.json({ success: true, data: experience });
  } catch (error) {
    console.error("Get experience error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const {
      title,
      company,
      location,
      startDate,
      endDate,
      current,
      description,
      order,
      logo,
    } = req.body;

    if (!title || !company || !startDate) {
      return res.status(400).json({
        success: false,
        error: "Title, Company and Start Date are required",
      });
    }

    const newExperience = await Experience.create({
      title,
      company,
      location: location || "",
      startDate,
      endDate: current ? null : endDate || null,
      current: current === "true" || current === true,
      description: description || "",
      logo: logo || "",
      order: Number(order) || 0,
    });

    res.status(201).json({ success: true, data: newExperience });
  } catch (error) {
    console.error("Create experience error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const existing = await Experience.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: "Experience not found",
      });
    }

    const {
      title,
      company,
      location,
      startDate,
      endDate,
      current,
      description,
      order,
      logo,
    } = req.body;

    const updateData = {
      title: title ?? existing.title,
      company: company ?? existing.company,
      location: location ?? existing.location,
      startDate: startDate ?? existing.startDate,
      endDate:
        current === "true" || current === true
          ? null
          : endDate ?? existing.endDate,
      current:
        current !== undefined
          ? current === "true" || current === true
          : existing.current,
      description: description ?? existing.description,
      logo: logo ?? existing.logo,
      order: order !== undefined ? Number(order) : existing.order,
    };

    const updated = await Experience.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update experience error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const deleted = await Experience.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Experience not found",
      });
    }

    res.json({ success: true, message: "Experience deleted" });
  } catch (error) {
    console.error("Delete experience error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const reorderExperiences = async (req: Request, res: Response) => {
  try {
    const updates = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        error: "Invalid payload format",
      });
    }

    const bulkOperations = updates
      .filter((item: any) =>
        mongoose.Types.ObjectId.isValid(item.id)
      )
      .map((item: any) => ({
        updateOne: {
          filter: { _id: item.id },
          update: {
            $set: {
              order: Number(item.order),
              updatedAt: new Date(),
            },
          },
        },
      }));

    if (!bulkOperations.length) {
      return res.status(400).json({
        success: false,
        error: "No valid updates provided",
      });
    }

    await Experience.bulkWrite(bulkOperations);

    res.json({
      success: true,
      message: "Experiences reordered successfully",
    });
  } catch (error) {
    console.error("Reorder experiences error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};