import { ExperiencesModel } from "../../models/experience-schema.js";

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteExperience = await ExperiencesModel.findByIdAndDelete(id);
    res.json({
      message: "Experience deleted succesfully",
      experience: deleteExperience,
    });
  } catch (err) {
    console.log(err);
    res.json({message: "an error occured while deleting company"})
  }
};
