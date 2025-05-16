// quiz.routes.ts
import express from "express";
import { getAllQuizzes, createQuiz, updateQuiz, deleteQuiz } from "../controllers/quiz.controller";

const router = express.Router();
router.get("/", getAllQuizzes);
router.post("/", createQuiz);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
