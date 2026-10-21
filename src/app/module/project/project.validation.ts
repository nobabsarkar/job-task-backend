import z from "zod";

const CreateProjectValidationSchema = z.object({
  projectName: z.string("Project Name is Required"),
  repoUrl: z.string("Repo Link is Required"),
  liveLink: z.string("Live Link is required"),
  description: z.string("Description is required"),
});

export const projectValidation = {
  CreateProjectValidationSchema,
};
