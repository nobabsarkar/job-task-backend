import config from "../../config";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);

  const { accessToken, refreshToken } = result;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.node_env === "development" ? false : true,
    sameSite: config.node_env === "development" ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "development" ? false : true,
    sameSite: config.node_env === "development" ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const getMe = catchAsync(async (req, res) => {
  const user = req?.user;

  if (!user) {
    throw new Error("User information is missing in the required");
  }

  const result = await AuthService.getMe(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  if (!req.cookies.refreshToken) {
    throw new AppError(httpStatus.NOT_FOUND, "Refresh Token is missing");
  }

  const result = await AuthService.refreshToken(req.cookies.refreshToken);

  const { accessToken, refreshToken: newRefreshToken } = result;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.node_env === "development" ? false : true,
    sameSite: config.node_env === "development" ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: config.node_env === "development" ? false : true,
    sameSite: config.node_env === "development" ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken,
    },
  });
});

export const AuthController = {
  loginUser,
  getMe,
  refreshToken,
};
