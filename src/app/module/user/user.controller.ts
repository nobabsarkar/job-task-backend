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

export const UserController = {
  registerUser,
};
