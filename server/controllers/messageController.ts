import { Request, Response } from "express";
import mongoose from "mongoose";
import {Message} from "../models/Message";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { isRead, isFlagged } = req.query;

    const filter: any = {};

    if (isRead !== undefined) {
      filter.isRead = isRead === "true";
    }

    if (isFlagged !== undefined) {
      filter.isFlagged = isFlagged === "true";
    }

    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: messages });
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, Email and Message are required",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject: subject || "",
      message,
      isRead: false,
      isFlagged: false,
      replied: false,
    });

    res.status(201).json({ success: true, data: newMessage ,message: "Message created successfully"});
  } catch (error) {
    console.error("Create message error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};



export const updateMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ID",
      });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        error: "Message not found",
      });
    }

    res.json({ success: true, data: updatedMessage });
  } catch (error) {
    console.error("Update message error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ID",
      });
    }

    const deleted = await Message.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Message not found",
      });
    }

    res.json({
      success: true,
      data: { message: "Message deleted successfully" },
    });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


