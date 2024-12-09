import { Router } from "express";
import {
  AddProject,
  DeleteProject,
  GetProjectById,
  GetProjects,
} from "../controllers/ProjectController.js";
import { upload } from "../utilitis/multerConf.js";

const ProjectRouter = Router();

ProjectRouter.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  AddProject
);
ProjectRouter.get("/", GetProjects);
ProjectRouter.get("/:id", GetProjectById);
ProjectRouter.delete("/:id", DeleteProject);

export default ProjectRouter;
