import { Router } from "express";
import { AddParticipant } from "../controllers/ParticipantController.js";
import { upload } from "../utilitis/multerConf.js";

const ParticipantRouter = Router();

ParticipantRouter.post("/", upload.single("file"), AddParticipant);

export default ParticipantRouter;
