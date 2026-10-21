import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidation.LoginZodSchema),
  AuthController.loginUser,
);

router.get(
  "/me",
  auth(Role.STUDENT, Role.SUPER_ADMIN, Role.MENTOR),
  AuthController.getMe,
);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
