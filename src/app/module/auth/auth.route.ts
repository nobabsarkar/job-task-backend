import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

const router = Router();

router.post("/login", AuthController.loginUser);

router.get("/me", auth(Role.STUDENT, Role.SUPER_ADMIN), AuthController.getMe);

export const AuthRoutes = router;
