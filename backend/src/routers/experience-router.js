
import {Router} from 'express';
import { createExperience } from '../controller/experience/create-experience.js';

import { updateExperience } from '../controller/experience/update-experience.js';
import { getAllExperiences } from "../controller/experience/get-all-experience.js"; 

export const experienceRouter = Router();

experienceRouter.post("/create", createExperience);
experienceRouter.put("/:id", updateExperience);
experienceRouter.get("/", getAllExperiences); 