import type { ProjectStatus } from "../../../../generated/prisma/enums";
import type { ProjectWhereInput } from "../../../../generated/prisma/models";
import type { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { ICreateProject } from "./project.interface";
import httpStatus from "http-status";

const createProjectIntoDB = async (
  payload: ICreateProject,
  studentId: string,
) => {
  const existingProject = await prisma.project.findFirst({
    where: {
      studentId,
      OR: [{ repoUrl: payload.repoUrl }, { liveLink: payload.liveLink }],
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
    include: {
      student: true,
    },
    omit: {
      studentId: true,
    },
  });

  return projects;
};

const adminGetAllProject = async (query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 5;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const andConditions: ProjectWhereInput[] = [];

  // Filter by status
  if (query.status) {
    andConditions.push({
      status: query.status.toUpperCase() as ProjectStatus,
    });
  }

  const whereConditions: ProjectWhereInput = {
    AND: andConditions,
  };

  const [projects, total] = await prisma.$transaction([
    prisma.project.findMany({
      where: whereConditions,
      skip,
      take: limit,
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
    }),

    prisma.project.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
    data: projects,
  };
};

const adminUpdateProjectsStatus = async (id: string, status: ProjectStatus) => {
  const projects = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!projects) {
    throw new AppError(httpStatus.NOT_FOUND, "Projects not found");
  }

  const result = await prisma.project.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return result;
};

const adminGetAllStatistics = async () => {
  const result = await prisma.project.findMany();

  return result;
};

export const ProjectService = {
  createProjectIntoDB,
  studentSeeOwnProject,
  adminGetAllProject,
  adminUpdateProjectsStatus,
  adminGetAllStatistics,
};
