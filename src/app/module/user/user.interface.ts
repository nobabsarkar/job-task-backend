import type { Role } from "../../../../generated/prisma/enums";

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface IRequestUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}
