import { Router } from "express";
import {
  AddMember,
  UpdateMember,
  DeleteMember,
  GetMembers,
} from "../controllers/MemberController.js";
import { upload } from "../utilitis/multerConf.js";

const MemberRouter = Router();

MemberRouter.post("/", upload.single("file"), AddMember);
MemberRouter.delete("/", DeleteMember);
MemberRouter.get("/all", GetMembers);
MemberRouter.put("/", UpdateMember);

export default MemberRouter;
