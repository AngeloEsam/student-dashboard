import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);
