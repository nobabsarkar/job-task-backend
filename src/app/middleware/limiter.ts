import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 3,
  message: {
    success: false,
    message: "per minute you can create 3 project",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
