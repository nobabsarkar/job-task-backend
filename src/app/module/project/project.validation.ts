import z from "zod";

const CreateProjectValidationSchema = z.object({
  projectName: z.string(),
  repoLink: z.string(),
  liveLink: z.string(),
  description: z.string(),
});

export const projectValidation = {
  CreateProjectValidationSchema,
};
