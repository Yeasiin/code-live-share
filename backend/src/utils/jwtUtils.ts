import JWT from "jsonwebtoken";
import { ObjectId } from "mongoose";

export function generateToken(payload: { _id: unknown }) {
  return JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
}
