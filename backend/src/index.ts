require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { z } from "zod";
import "express-async-errors";
import authRouter from "./routes/authRoute";
import {
  globalErrorHandler,
  routeNotFound,
} from "./controllers/errorController";
import DBConnect from "./utils/dbUtils";
import utilRoute from "./routes/utilRoute";

// maping the error into good error message
import "zodsimpleerror";

const app = express();

// log
app.use(morgan("dev"));

// cors
app.use(cors());

// app middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database connection
DBConnect(process.env.MONGO_URI);

// route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/util", utilRoute);

// error handling
app.use(routeNotFound);
app.use(globalErrorHandler);

const PORT = (process.env.PORT || 5000) as number;

// listing the server aka spinning the server
app.listen(PORT, () =>
  console.log(
    `server running ${process.env.NODE_ENV} Mode on localhost:${PORT}`
  )
);
