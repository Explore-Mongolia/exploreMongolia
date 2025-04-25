import { CompanyModel } from "../../models/company-schema.js";

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.find({}).lean();

    res.status(200).json({
      message: "Companies fetched successfully",
      companies,
    });
  } catch (err) {
    console.log("Error fetching companies:", err);
    res.status(500).json({ message: "Failed to fetch companies" });
  }
};
