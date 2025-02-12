import { Router } from "express";
import { CreateEvent, GetEvents } from "../controllers/EventController.js";
import { authenticateToken } from "../middleware/Auth.js";
import { upload } from "../utilitis/multerConf.js";

const EventRouter = Router();

EventRouter.post(
  "/",
  authenticateToken,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "speakerImages", maxCount: 10 },
  ]),
  CreateEvent
);

EventRouter.get("/", GetEvents);

export default EventRouter;
