
import { Router } from "express";
import { createCompany } from "../controller/company/create-company.js";
import { getCompany } from "../controller/company/get-company.js";

export const companyRouter = Router();

companyRouter.post('/create', createCompany);
companyRouter.get('/:id', getCompany)