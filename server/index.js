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
import EventRouter from "./routes/EventRouter.js";
import VisitorRouter from "./routes/VisitorRouter.js";
import DepartmentRouter from "./routes/DepartmentRouter.js";
import RegistrationRouter from "./routes/RegistrationRouter.js";

dotenv.config();

// Initialize MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = db;
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUD_API_NAME,
  api_secret: process.env.CLOUDE_KEY,
});

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB before handling routes
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/member", MemberRouter);
app.use("/project", ProjectRouter);
app.use("/participant", ParticipantRouter);
app.use("/event", EventRouter);
app.use("/visitor", VisitorRouter);
app.use("/department", DepartmentRouter);
app.use("/registration", RegistrationRouter);
app.use(AdminRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

export default app;
