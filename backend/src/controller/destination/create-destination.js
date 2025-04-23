import { DestinationModel } from "../../models/destination-schema.js";

export const createDestination = async (req, res) => {
  try {
    const { name, company, description } = req.body;
    const newDestination = await DestinationModel.create({
      name,
      company,
      description,
    });

    res.status(201).json({
      message: "Destination created successfully",
      destination: newDestination,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create destination", error });
  }
};
