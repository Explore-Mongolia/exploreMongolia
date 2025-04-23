import { ExperiencesModel } from "../../models/experience-schema.js";

export const createExperience = async (req, res) => {
  const { name, visitedPlaces, description ,user } = req.body;
  try {
    const newExperience = await ExperiencesModel.create({
      name,
      visitedPlaces,
      description,
      user
    });

    res.status(201).json({
      message: "Experience created successfully",
      experience: newExperience,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create experience", error });
  }
};
