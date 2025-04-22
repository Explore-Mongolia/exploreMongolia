import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectionString = process.env.MONGO_URL;
export const connectToDatabase = async () => {
  const urls = connectionString;
  await mongoose.connect(urls);
  console.log("Connected to database");
};