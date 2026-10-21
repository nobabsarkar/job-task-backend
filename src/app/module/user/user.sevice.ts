import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { IRequestUser, RegisterUser } from "./user.interface";
import httpStatus from "http-status";
import config from "../../config";
import type { Role } from "../../../../generated/prisma/enums";

const registerUserIntoDB = async (payload: RegisterUser) => {
  const { name, email, password, role } = payload;

  const isUserExit = await prisma.student.findUnique({
    where: { email },
  });

  if (isUserExit) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User with this email already exists",
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createUser = await prisma.student.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  const user = await prisma.student.findUnique({
    where: {
      id: createUser.id,
      email: createUser.email || email,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

const adminGetAllUserFromDB = async () => {
  const result = await prisma.student.findMany({
    omit: {
      password: true,
    },
  });

  return result;
};

const adminUpdateUserRole = async (id: string, role: Role) => {
  const user = await prisma.student.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const updateUserRole = await prisma.student.update({
    where: {
      id: id,
    },
    data: {
      role,
    },
    omit: {
      password: true,
    },
  });

  return updateUserRole;
};

export const UserService = {
  registerUserIntoDB,
  adminGetAllUserFromDB,
  adminUpdateUserRole,
};
