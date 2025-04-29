import { DestinationModel } from "../../models/destination-schema.js";

export const getAllDestination = async (req, res) => {
  try {
    const destination = await DestinationModel.find();
    res
      .status(404)
      .json({ message: " all destinations got succesfully", destination });
  } catch {
    return res.status(404).json({ message: "failed to get destination" });
  }
};
