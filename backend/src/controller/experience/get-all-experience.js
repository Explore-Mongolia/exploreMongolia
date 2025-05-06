import { ExperiencesModel } from "../../models/experience-schema.js";

export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await ExperiencesModel.find()
      .populate("user", "name profileImage") 
      .lean(); 

    
    const experiencesWithCounts = experiences.map((exp) => ({
      ...exp,
      reactionsCount: exp.reactions?.length || 0,
    }));

    res.status(200).json({ experiences: experiencesWithCounts });
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    res.status(500).json({ message: "Failed to fetch experiences", error });
  }
};
