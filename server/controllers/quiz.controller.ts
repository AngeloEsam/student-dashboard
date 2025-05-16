import { Request, Response } from "express";
import Quiz from "../models/Quiz";

export const getAllQuizzes = async (_: Request, res: Response) => {
    try {
        const data = await Quiz.find().sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch quizzes", error });
    }
};

export const createQuiz = async (req: Request, res: Response) => {
    try {
        const { title, course } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newItem = new Quiz({ title, course });
        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: "Failed to create quiz", error });
    }
};

export const updateQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await Quiz.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Failed to update quiz", error });
    }
};

export const deleteQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Quiz.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete quiz", error });
    }
};
