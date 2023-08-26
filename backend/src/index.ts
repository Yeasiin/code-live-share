import express, { NextFunction, RequestHandler } from "express";
import morgan from "morgan";
import "express-async-errors";
import { config } from "dotenv";
import User from "./models/User";
import {
  globalErrorHandler,
  routeNotFound,
} from "./controllers/errorConroller";
config();

const app = express();

app.use(morgan("dev"));

app.get("/", async (req, res) => {
  const result = await User.create({
    firstName: "yeasin",
    lastName: "arfat",
    email: "mail@mail.com",
    password: "123123",
  });

  console.log(result);

  res.json({
    message: "hello",
  });
});

app.use(routeNotFound);
app.use(globalErrorHandler);

const PORT = (process.env.PORT || 5000) as number;

app.listen(PORT, () => console.log("port 5000"));
