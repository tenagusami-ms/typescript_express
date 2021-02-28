import createHttpError from "http-errors";
import express from "express";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { router as indexRouter } from "./routes";
import usersRouter from "./routes/users";

const app = express();

//app.set("views", path.join(__dirname, "views"));
app.set("views", "views");
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((req: Request, res: Response, next: NextFunction) =>
  next(createHttpError(404))
);
app.use((err: any, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
