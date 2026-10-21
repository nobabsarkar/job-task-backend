import { Router } from "express";
import { ProjectController } from "./project.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { projectValidation } from "./project.validation";
import { createProjectRateLimiter } from "../../middleware/rateLimiter";

const router = Router();

router.post(
  "/create-project",
  auth(Role.STUDENT),
  createProjectRateLimiter,
  validateRequest(projectValidation.CreateProjectValidationSchema),
  ProjectController.createProject,
);

router.get(
  "/own-project",
  auth(Role.STUDENT),
  ProjectController.studentSeeOwnProject,
);

router.get(
  "/all-projects",
  auth(Role.SUPER_ADMIN, Role.MENTOR),
  ProjectController.adminGetAllProject,
);

router.patch(
  "/status/:id",
  auth(Role.SUPER_ADMIN, Role.MENTOR),
  ProjectController.adminUpdateProjectsStatus,
);

export const ProjectRoutes = router;
