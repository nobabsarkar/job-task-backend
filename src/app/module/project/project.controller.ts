import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectService } from "./project.service";
import httpStatus from "http-status";

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectService.createProjectIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project is Created Successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
};
