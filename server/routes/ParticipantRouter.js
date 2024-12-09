import { Router } from "express";
import {
  AddParticipant,
  GetParticipants,
  ParticipantStatus,
} from "../controllers/ParticipantController.js";
import { upload } from "../utilitis/multerConf.js";

const ParticipantRouter = Router();

ParticipantRouter.post("/new", upload.single("file"), AddParticipant);
ParticipantRouter.get("/all", GetParticipants);
ParticipantRouter.put("/:id", ParticipantStatus);

export default ParticipantRouter;
