import { userModel } from "../../models/user-schema.js";

export const getUser = async (req, res) => {
  const { id } = req.params; 

  try {
    const user = await userModel.findById(id).populate("tripPlans"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User fetched successfully",
      user, 
    });
  } catch (err) {
    console.error("Error fetching user:", err); 
    return res.status(500).json({ message: "An error occurred while getting user" });
  }
};
