import { DestinationModel } from "../../models/destination-schema.js";

export const createDestination = async (req, res) => {
  try {
    const { name, company, description, cost, vibesAvailable, image, location } = req.body;

  
    if (!location || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
      return res.status(400).json({ message: "Invalid location format. Coordinates must be an array of [longitude, latitude]." });
    }

    
    const newDestination = await DestinationModel.create({
      name,
      company,
      description,
      cost,
      vibesAvailable,
      image,
      location,  
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
