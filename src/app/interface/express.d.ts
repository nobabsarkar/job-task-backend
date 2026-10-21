import type { IRequestUser } from "../module/user/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IRequestUser;
    }
  }
}

export {};
