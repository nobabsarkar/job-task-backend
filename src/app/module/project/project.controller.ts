import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectService } from "./project.service";
import httpStatus from "http-status";

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectService.createProjectIntoDB(
    req.body,
    req?.user?.id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project is Created Successfully",
    data: result,
  });
});

const studentSeeOwnProject = catchAsync(async (req, res) => {
  const studentId = req?.user?.id;

  const result = await ProjectService.studentSeeOwnProject(studentId as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Student retrieved own project successfully",
    data: result,
  });

  return result;
});

const adminGetAllProject = catchAsync(async (req, res) => {
  const result = await ProjectService.adminGetAllProject(req?.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Admin project retrieved successfully",
    data: result,
  });
});

const adminUpdateProjectsStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await ProjectService.adminUpdateProjectsStatus(
    id as string,
    status,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project status update successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  studentSeeOwnProject,
  adminGetAllProject,
  adminUpdateProjectsStatus,
};
