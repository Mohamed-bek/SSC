import { Router } from "express";
import {
  AddMember,
  UpdateMember,
  DeleteMember,
  GetMembers,
} from "../controllers/MemberController.js";
import { authenticateToken } from "../middleware/Auth.js";
import { upload } from "../utilitis/multerConf.js";

const MemberRouter = Router();

MemberRouter.post("/", authenticateToken, upload.single("file"), AddMember);
MemberRouter.delete("/", authenticateToken, DeleteMember);
MemberRouter.get("/all", GetMembers);
MemberRouter.put("/", authenticateToken, UpdateMember);

export default MemberRouter;
