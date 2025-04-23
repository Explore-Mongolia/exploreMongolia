import { ExperiencesModel } from "../../models/experience-schema.js";

export const getExperience = async (req, res) => {
const { id } = req.params;
  try {
    const experience = await ExperiencesModel.findById(id).populate("user");
    if (!experience){
        return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({
        message: "Experience got successfully",
        experience,
    });
  }catch (error){
    console.log(error);
    res.status(500).json({ message: "Failed to get experience", error });
  }
   


}