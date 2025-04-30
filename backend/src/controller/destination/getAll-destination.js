import { DestinationModel } from "../../models/destination-schema.js";

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await DestinationModel.find();

    return res.status(200).json({
      message: "All destinations fetched successfully.",
      destinations,
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return res.status(500).json({
      message: "Failed to fetch destinations.",
      error: error.message,
    });
  }
};
