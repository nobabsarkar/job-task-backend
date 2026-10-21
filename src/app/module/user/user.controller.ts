import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.sevice";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await UserService.registerUserIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Register Successfully",
    data: result,
  });
});

const adminGetAllUser = catchAsync(async (req, res) => {
  const result = await UserService.adminGetAllUserFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Retrive Successfully",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const result = await UserService.adminUpdateUserRole(id as string, role);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Student Role Updated Successfully",
    data: result,
  });
});

export const UserController = {
  registerUser,
  adminGetAllUser,
  updateUserRole,
};
