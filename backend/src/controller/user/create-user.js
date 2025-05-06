import { UserModel } from "../../models/user-schema.js";

export const createUser = async (req, res) => {
  const { name, email, profileImage, bio, location, socialLinks } = req.body;

  try {
    const newUser = new UserModel({
      name,
      email,
      profileImage,
      bio,
      location,
      socialLinks,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "An error occurred while creating user" });
  }
};
