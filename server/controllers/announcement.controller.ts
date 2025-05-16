import { Request, Response } from "express";
import Announcement from "../models/Announcement";

export const getAllAnnouncements = async (_: Request, res: Response) => {
    try {
        const data = await Announcement.find().sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch announcements", error });
    }
};


export const createAnnouncement = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newItem = new Announcement({ title, content });
        const saved = await newItem.save();

        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: "Failed to create announcement", error });
    }
};


export const updateAnnouncement = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await Announcement.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Failed to update announcement", error });
    }
};


export const deleteAnnouncement = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Announcement.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete announcement", error });
    }
};
