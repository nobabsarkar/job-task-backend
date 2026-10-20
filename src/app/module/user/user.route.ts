import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

const router = Router();

router.post("/register", UserController.registerUser);

export const UserRoutes = router;
