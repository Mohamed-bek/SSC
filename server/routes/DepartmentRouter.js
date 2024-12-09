import { Router } from "express";
import {
  AddDepartment,
  AddMembers,
  ChangeLeaderAndCoLeader,
  RemoveMember,
} from "../controllers/DepartmentController";

const DepartmentRouter = Router();

DepartmentRouter.post("/", AddDepartment);
DepartmentRouter.put("/leaders/:id", ChangeLeaderAndCoLeader);
DepartmentRouter.patch("/members/:id", AddMembers);
DepartmentRouter.patch("/member/:id", RemoveMember);

export default DepartmentRouter;
