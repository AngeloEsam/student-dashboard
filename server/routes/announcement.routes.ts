import express from "express";
import { createAnnouncement, deleteAnnouncement, getAllAnnouncements, updateAnnouncement } from "../controllers/announcement.controller";

const router = express.Router();

router.get("/", getAllAnnouncements);
router.post("/", createAnnouncement);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router;
