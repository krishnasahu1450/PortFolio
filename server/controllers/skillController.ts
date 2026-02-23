import { Request, Response } from "express";
import mongoose from "mongoose";
import {Skill} from "../models/Skill";

export const getSkills = async (req: Request, res: Response) => {
  try {
    const { category, status } = req.query;

    const filter: any = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const skills = await Skill.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.json({ success: true, data: skills });
  } catch (error) {
    console.error("Get skills error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const { name, category, level, status, order } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Skill name is required",
      });
    }

    const newSkill = await Skill.create({
      name,
      category: category || "",
      level: level ? Number(level) : undefined,
      status: status || "active",
      order: order ? Number(order) : 0,
    });

    res.status(201).json({ success: true, data: newSkill });
  } catch (error) {
    console.error("Create skill error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Skill ID",
      });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      {
        ...req.body,
        order:
          req.body.order !== undefined
            ? Number(req.body.order)
            : undefined,
        level:
          req.body.level !== undefined
            ? Number(req.body.level)
            : undefined,
      },
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({
        success: false,
        error: "Skill not found",
      });
    }

    res.json({ success: true, data: updatedSkill });
  } catch (error) {
    console.error("Update skill error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Skill ID",
      });
    }

    const deleted = await Skill.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Skill not found",
      });
    }

    res.json({
      success: true,
      data: { message: "Skill deleted successfully" },
    });
  } catch (error) {
    console.error("Delete skill error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

