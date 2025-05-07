import mongoose from "mongoose";
import { UserModel } from "../../models/user-schema.js";

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await UserModel.findById(id)
      .populate("tripPlans")
      .populate("experiences");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res
      .status(500)
      .json({ message: "An error occurred while getting user" });
  }
};
