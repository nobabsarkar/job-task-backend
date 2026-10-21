import { prisma } from "../../lib/prisma";
import type { ICreateProject } from "./project.interface";

const createProjectIntoDB = async (
  payload: ICreateProject,
  studentId: string,
) => {
  const existingProject = await prisma.project.findUnique({
    where: {
      studentId_repoUrl: {
        studentId,
        repoUrl: payload.repoUrl,
      },
    },
  });

  if (existingProject) {
    throw new Error("You have already submitted this project.");
  }

  const project = await prisma.project.create({
    data: {
      ...payload,
      student: {
        connect: {
          id: studentId,
        },
      },
    },
    include: {
      student: {
        omit: {
          password: true,
        },
      },
    },

    omit: {
      studentId: true,
    },
  });

  return project;
};

const studentSeeOwnProject = async (studentId: string) => {
  const projects = await prisma.project.findMany({
    where: {
      studentId,
    },
  });

  return projects;
};

export const ProjectService = {
  createProjectIntoDB,
  studentSeeOwnProject,
};
