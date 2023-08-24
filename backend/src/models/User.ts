import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "{PATH} is Required"] },
  lastName: { type: String, required: [true, "{PATH} is Required"] },
  email: {},
});

export const User = mongoose.model("User", userSchema);
