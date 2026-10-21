import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

const router = Router();

router.post(
  "/register",
  validateRequest(UserValidation.UserRegistrationZodSchema),
  UserController.registerUser,
);

router.get("/all", UserController.adminGetAllUser);

router.patch(
  "/update-role/:id",
  auth(Role.SUPER_ADMIN),
  UserController.updateUserRole,
);

export const UserRoutes = router;
