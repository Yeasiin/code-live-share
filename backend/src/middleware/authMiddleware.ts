import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import User from "../models/User";
import AppError from "../utils/appError";
import { StatusCodes } from "http-status-codes";

export async function protect(req: Request, res: Response, next: NextFunction) {
  const bearer = req.headers["authorization"];

  if (!bearer) throw new AppError("invalid request", StatusCodes.UNAUTHORIZED);

  try {
    const [, token] = bearer.split(" ");
    const result = JWT.verify(token, process.env.JWT_SECRET) as { _id: string };
    const user = await User.findById(result._id);
    if (!user) throw new AppError("User doesn't exit", StatusCodes.NOT_FOUND);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
