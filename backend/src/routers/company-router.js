
import { Router } from "express";
import { createCompany } from "../controller/company/create-company.js";

export const companyRouter = Router();

companyRouter.post('/create', createCompany);