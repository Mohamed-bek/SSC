import { Router } from "express";
import {
  AddAdmin,
  Login,
  LogOut,
  RefreshToken,
  UpdateAvatar,
} from "../controllers/AdminController.js";

const AdminRouter = Router();

AdminRouter.post("/create", AddAdmin);
AdminRouter.post("/login", Login);
AdminRouter.get("/refresh_tokens", RefreshToken);
AdminRouter.get("/logout", LogOut);
AdminRouter.put("/", UpdateAvatar);

export default AdminRouter;
