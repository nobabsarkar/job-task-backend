import rateLimit from "express-rate-limit";

export const createProjectRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    message:
      "you can create only 5 projects per minute. Please try again later",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
