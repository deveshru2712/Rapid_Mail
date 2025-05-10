import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import authRouter from "./routes/auth.routes";
import env from "./utils/validateEnv";

export const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hii there i am yash chandra");
});

app.use("/api/auth", authRouter);
// app.use("/api/message", messageRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Page not found!"));
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  let errMessage = err || "Unknown error occurred";
  let statusCode = 500;
  if (isHttpError(err)) {
    statusCode = err.statusCode;
    errMessage = err.message;
  }

  res.status(statusCode).json({ error: errMessage });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on the port:${env.PORT}`);
});
