import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRoutes } from "./app/module/user/user.route";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { ProjectRoutes } from "./app/module/project/project.route";

const app: Application = express();

app.use(
  cors({
    origin: "",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/projects", ProjectRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
