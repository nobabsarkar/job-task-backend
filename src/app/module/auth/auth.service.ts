import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { ILoginPayload, IRequestUser } from "./auth.interface";
import httpStatus from "http-status";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import type { JwtPayload, SignOptions } from "jsonwebtoken";

const loginUser = async (payload: ILoginPayload) => {
  const { password } = payload;

  const email = payload?.email?.trim()?.toLowerCase();

  const user = await prisma.student.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const isPasswordMatched = await bcrypt.compare(password, user?.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password Does Not Match");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const getMe = async (student: IRequestUser) => {
  const isUserExists = await prisma.student.findUnique({
    where: {
      id: student?.id,
    },
    omit: {
      password: true,
    },
  });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  return isUserExists;
};

const refreshToken = async (token: string) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(
    token,
    config.jwt_refresh_secret as string,
  );

  if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      config.node_env === "development"
        ? verifiedRefreshToken.error
        : "Invalid refresh token",
    );
  }

  const data = verifiedRefreshToken?.data as JwtPayload;

  const user = await prisma.student.findUnique({
    where: { id: data?.id },
  });

  const jwtPayload = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
  getMe,
  refreshToken,
};
