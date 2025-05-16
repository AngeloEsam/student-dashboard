import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import announcementRoutes from "./routes/announcement.routes";
import quizRoutes from "./routes/quiz.routes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/announcements", announcementRoutes);
app.use("/api/quizzes", quizRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
export default app