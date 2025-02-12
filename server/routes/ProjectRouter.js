import { Router } from "express";
import {
  AddProject,
  DeleteProject,
  GetProjectById,
  GetProjects,
} from "../controllers/ProjectController.js";
import { authenticateToken } from "../middleware/Auth.js";
import { upload } from "../utilitis/multerConf.js";

const ProjectRouter = Router();

ProjectRouter.post("/", authenticateToken, upload.single("file"), AddProject);
ProjectRouter.get("/", GetProjects);
ProjectRouter.get("/:id", GetProjectById);
ProjectRouter.delete("/:id", authenticateToken, DeleteProject);

export default ProjectRouter;
