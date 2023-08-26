import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { z } from "zod";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "{PATH} is Required"] },
    lastName: { type: String, required: [true, "{PATH} is Required"] },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, "{PATH} is required"],
      validate: {
        validator: function (value: string) {
          return z.string().email().safeParse(value).success;
        },
        message: "{VALUE} is not a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "{PATH} is required"],
      trim: true,
      select: false,
      validation: {
        validator: function (value: string) {
          return z.string().min(6).max(50).safeParse(value).success;
        },
        message: "{VALUE} doesn't meet the requirement",
      },
    },
    avatar: String,
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: String,
      select: false,
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },
    verified: Date,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.isPasswordMatch = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  console.log(this);
  next();
  // const salt = await bcrypt.genSalt(10);
  // this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
