import express from "express";
import { UserModel } from "../models/user-schema.js";

export const clerkUserRouter = express.Router();

clerkUserRouter.post("/create", async (req, res) => {
  const { name, email, profileImage } = req.body;  

  try {
    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        name,
        email,
        profileImage, 
      });
      await user.save();
    } else {
      user.profileImage = profileImage;
      await user.save();
    }

    res.status(200).json({
      message: "User synced successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error("Failed to sync user to DB", error);
    res.status(500).json({ message: "Failed to sync user to DB", error });
  }
});
