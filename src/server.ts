import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/users";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.json({ message: `had an error: ${err.message}` });
});

export default app;
