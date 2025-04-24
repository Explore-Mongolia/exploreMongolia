import { CompanyModel } from "../../models/company-schema.js";

export const getCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await CompanyModel.findById(id).populate("destinations"); 

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company fetched successfully",
      company,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get company", error });
  }
};
