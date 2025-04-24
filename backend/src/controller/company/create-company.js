import { CompanyModel } from "../../models/company-schema.js";


export const createCompany = async (req, res) => {
    try {
        const { name, description, contact, profileImage } = req.body;

        const newCompany = await CompanyModel.create({
            name, description, contact, profileImage
        });

        res.status(201).json({
            message: "Company created successfully",
            company: newCompany
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create order", error });
    }
};