import { Router } from "express";
import { ProjectController } from "./project.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { projectValidation } from "./project.validation";

const router = Router();

router.post(
  "/create-project",
  auth(Role.STUDENT),
  validateRequest(projectValidation.CreateProjectValidationSchema),
  ProjectController.createProject,
);

router.get(
  "/own-project",
  auth(Role.STUDENT),
  ProjectController.studentSeeOwnProject,
);

export const ProjectRoutes = router;
