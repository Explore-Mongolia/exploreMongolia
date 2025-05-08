import { ExperiencesModel } from "../../models/experience-schema.js";
import { UserModel } from "../../models/user-schema.js";

export const createExperience = async (req, res) => {
  const {
    name,
    visitedPlaces,
    description,
    images = [],
    tips,
    totalCost,
    highlights,
    tripDates,
    vibes,
  } = req.body;

  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const newExperience = await ExperiencesModel.create({
      name,
      visitedPlaces,
      description,
      user: userId,
      images,
      tips,
      totalCost,
      highlights,
      tripDates,
      vibes,
    });

    await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { experiences: newExperience._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Experience created successfully",
      experience: newExperience,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create experience", error });
  }
};
