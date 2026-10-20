import z from "zod";

const LoginZodSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password Must Minimum 6 Characters"),
});

export const AuthValidation = {
  LoginZodSchema,
};
