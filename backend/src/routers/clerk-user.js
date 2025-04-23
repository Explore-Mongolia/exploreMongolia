
import express from "express";
import { userModel } from "../models/user-schema.js";

export const clerkUserRouter = express.Router();

clerkUserRouter.post("/create", async (req, res) => {
  try {
    const { name, email } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    const newUser = await userModel.create({ name, email });
    return res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error saving user", error: err });
  }
});
