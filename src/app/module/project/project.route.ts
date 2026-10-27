import { Router } from "express";
import { ProjectController } from "./project.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { rateLimiter } from "../../middleware/limiter";
const router = Router();

router.post(
  "/create-project",
  rateLimiter,
  auth(Role.STUDENT),
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

router.get(
  "/statistics",
  auth(Role.SUPER_ADMIN, Role.MENTOR),
  ProjectController.adminGetAllStatisticsData,
);

export const ProjectRoutes = router;
