import { ExperiencesModel } from "../../models/experience-schema.js";

export const updateExperience = async (req, res) => {
  const { id } = req.params;
  const { name, visitedPlaces, description } = req.body;
  try {
    const updatedExperience = await ExperiencesModel.findByIdAndUpdate(
      id,
      { name, visitedPlaces, description },
     
    ).populate("user");
    if (!updatedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({
      message: "Experience updated successfully",
      experience: updatedExperience,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update experience", error });
  }
};
