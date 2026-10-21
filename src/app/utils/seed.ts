import bcrypt from "bcryptjs";
import config from "../config";
import { prisma } from "../lib/prisma";

import httpstatus from "http-status";
import { AppError } from "./AppError";
import { Role } from "../../../generated/prisma/enums";

export const seedSuperAdmin = async () => {
  try {
    const name = config.super_admin_name;
    const email = config.super_admin_email;
    const password = config.super_admin_password;

    // Validate environment configuration
    if (!name || !email || !password) {
      throw new AppError(
        httpstatus.NOT_FOUND,
        "Super Admin Name, Email, or Password is Missing.",
      );
    }

    // Check whether a Super Admin already exists
    const isSuperAdminExist = await prisma.student.findFirst({
      where: {
        role: Role.SUPER_ADMIN,
      },
    });

    if (isSuperAdminExist) {
      console.log("Super Admin already exists. Skipping seeding.");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    // Create Super Admin
    const superAdmin = await prisma.student.create({
      data: {
        name,
        email,
        role: Role.SUPER_ADMIN,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    console.log("Super Admin Created:", superAdmin);
  } catch (error) {
    console.error("Error Seeding Super Admin:", error);

    throw error;
  }
};
