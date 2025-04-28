import { ExperiencesModel } from "../../models/experience-schema.js";

export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await ExperiencesModel.find();
    res.status(200).json({ experiences });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch experiences", error });
  }
};
