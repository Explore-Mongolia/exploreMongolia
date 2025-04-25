
import { Router } from "express";
import { createCompany } from "../controller/company/create-company.js";
import { getCompany } from "../controller/company/get-company.js";
import { getAllCompanies } from "../controller/company/get-all-companies.js";

export const companyRouter = Router();

companyRouter.post('/create', createCompany);
companyRouter.get('/company/:id', getCompany)

companyRouter.get("/companies", getAllCompanies);git 