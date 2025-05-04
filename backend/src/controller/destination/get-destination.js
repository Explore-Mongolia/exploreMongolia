import { DestinationModel } from "../../models/destination-schema.js";

export const getDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await DestinationModel.findById(id).populate("company");
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json({
      message: "Destination got successfully",
      destination,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get destination", error });
  }
};
