import type { IQuery } from "../../interface";
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

  const [projects, total] = await prisma.$transaction([
    prisma.project.findMany({
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

  // const projects = await prisma.project.findMany({
  //   include: {
  //     student: {
  //       omit: {
  //         password: true,
  //       },
  //     },
  //   },
  //   omit: {
  //     studentId: true,
  //   },
  // });

  // return projects;
};

export const ProjectService = {
  createProjectIntoDB,
  studentSeeOwnProject,
  adminGetAllProject,
};
