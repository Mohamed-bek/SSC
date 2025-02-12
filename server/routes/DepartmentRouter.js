import { Router } from "express";
import {
  AddDepartment,
  ChangeLeaderAndCoLeader,
  GetDepartements,
  RemoveMember,
} from "../controllers/DepartmentController.js";
import { authenticateToken } from "../middleware/Auth.js";
import { upload } from "../utilitis/multerConf.js";

const DepartmentRouter = Router();

DepartmentRouter.post(
  "/",
  authenticateToken,
  upload.single("file"),
  AddDepartment
);
DepartmentRouter.get("/", GetDepartements);
DepartmentRouter.put(
  "/leaders/:id",
  authenticateToken,
  ChangeLeaderAndCoLeader
);
DepartmentRouter.patch("/member/:id", authenticateToken, RemoveMember);

export default DepartmentRouter;
