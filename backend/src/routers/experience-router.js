
import {Router} from 'express';
import { createExperience } from '../controller/experience/create-experience.js';
import { getExperience } from '../controller/experience/get-experience.js';

export const experienceRouter = Router();

experienceRouter.post("/create", createExperience);
experienceRouter.get("/:id" , getExperience);