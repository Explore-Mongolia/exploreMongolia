import { CompanyModel } from "../../models/company-schema.js";

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCompany = await CompanyModel.findByIdAndDelete(id);
    res.json({
      message: "company deleted succesfully",
      company: deleteCompany,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "an error occured while deleting company" });
  }
};
