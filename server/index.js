import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import MemberRouter from "./routes/MemberRouter.js";
import AdminRouter from "./routes/AdminRouter.js";
import ProjectRouter from "./routes/ProjectRouter.js";
import ParticipantRouter from "./routes/ParticipantRouter.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUD_API_NAME,
  api_secret: process.env.CLOUDE_KEY,
});

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/member", MemberRouter);
app.use("/project", ProjectRouter);
app.use("/participant", ParticipantRouter);
app.use(AdminRouter);

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
