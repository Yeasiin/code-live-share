import mongoose from "mongoose";

export default async function DBConnect(mongoURI: string) {
  try {
    await mongoose.connect(mongoURI);
    console.log("database connected");
  } catch (error) {
    console.log("error 💣", error);
    process.exit(1);
  }
}
