import type { Role } from "../../../../generated/prisma/enums";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRequestUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}
