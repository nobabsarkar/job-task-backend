import { prisma } from "../../lib/prisma";
import type { ICreateProject } from "./project.interface";

const createProjectIntoDB = async (payload: ICreateProject) => {
  const project = await prisma.project.create({
    data: {
      ...payload,
    },
  });

  return project;
};

export const ProjectService = {
  createProjectIntoDB,
};
