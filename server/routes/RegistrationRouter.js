import { Router } from "express";
import { MakeRegistration } from "../controllers/RegistrationController.js";

const RegistrationRouter = Router();

RegistrationRouter.post("/", MakeRegistration);

export default RegistrationRouter;
