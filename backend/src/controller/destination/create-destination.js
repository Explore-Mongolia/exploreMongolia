import { DestinationModel } from "../../models/destination-schema.js";
import { CompanyModel } from "../../models/company-schema.js"; 

export const createDestination = async (req, res) => {
  try {
    const { name, company, description, cost, vibesAvailable, image, location } = req.body;

    console.log("Request body:", req.body);

    if (!location || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
      return res.status(400).json({ message: "Invalid location format. Coordinates must be an array of [longitude, latitude]." });
    }

    if (!company || typeof company !== "string") {
      return res.status(400).json({ message: "Invalid or missing company ID." });
    }

    const numericCost = parseFloat(cost);
    if (isNaN(numericCost)) {
      return res.status(400).json({ message: "Cost must be a number." });
    }

    const existingCompany = await CompanyModel.findById(company);
    if (!existingCompany) {
      return res.status(404).json({ message: "Company not found." });
    }

    const newDestination = await DestinationModel.create({
      name,
      company,
      description,
      cost: numericCost,
      vibesAvailable,
      image,
      location,
    });

    await CompanyModel.findByIdAndUpdate(
      company,
      { $push: { destinations: newDestination._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Destination created successfully",
      destination: newDestination,
    });

  } catch (error) {
    console.log("Error while creating destination:", error.message);
    res.status(500).json({ message: "Failed to create destination", error: error.message });
  }
};
