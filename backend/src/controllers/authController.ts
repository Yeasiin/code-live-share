import { Request, Response } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { generateToken } from "../utils/jwtUtils";
import AppError from "../utils/appError";

const registerSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email().toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 character"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });
async function register(req: Request, res: Response) {
  const registerData = registerSchema.parse(req.body);

  const isUserExist = await User.findOne({ email: registerData.email });

  if (isUserExist)
    throw new AppError(
      "User Already exist with the same email",
      StatusCodes.BAD_REQUEST
    );

  const user = await User.create(registerData);
  user.password = undefined;

  const token = generateToken({ _id: user.id });

  res.status(StatusCodes.CREATED).json({
    success: true,
    status: "success",
    message: "Register Successful",
    token,
    data: user,
  });
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "password length is not correct"),
});

async function login(req: Request, res: Response) {
  const loginData = loginSchema.parse(req.body);

  const user = await User.findOne({ email: loginData.email }).select(
    "+password"
  );

  if (!user || !(await user.isPasswordMatch(loginData.password))) {
    throw new AppError("Invalid Credential", StatusCodes.BAD_REQUEST);
  }

  // clearing the password filed before sending to the user
  user.password = undefined;

  const token = generateToken({ _id: user.id });

  res.status(StatusCodes.OK).json({
    success: true,
    status: "success",
    message: "Login successful",
    token,
    data: user,
  });
}

async function getProfile(req: Request, res: Response) {
  const user = await User.findById(req.user.id);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: user,
  });
}

const updateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().toLowerCase().optional(),
});

async function updateProfile(req: Request, res: Response) {
  const updateValue = updateSchema.parse(req.body);

  const user = await User.findByIdAndUpdate(req.user.id, updateValue, {
    new: true,
  });

  console.log(user, updateValue);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: user,
  });
}

export default { register, login, getProfile, updateProfile };
