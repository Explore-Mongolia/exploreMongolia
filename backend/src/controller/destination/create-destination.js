import { DestinationModel } from "../../models/destination-schema.js";

export const createDestination = async (req, res) => {
  try {
    const { name, company, description, cost, vibesAvailable, image } = req.body;

    const newDestination = await DestinationModel.create({
      name,
      company,
      description,
      cost,
      vibesAvailable,
      image
    });

    res.status(201).json({
      message: "Destination created successfully",
      destination: newDestination,
    });
  } catch (error) {
    console.log("Error while creating destination:", error);
    res.status(500).json({ message: "Failed to create destination", error });
  }
};
