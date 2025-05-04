import express from 'express';
import { createCompanyRating } from '../controller/rating/create-companyRating.js';
import { createDestinationRating } from '../controller/rating/create-destinationRating.js';
import { reactToExperience } from '../controller/rating/create-experienceRating.js';

export const ratingRouter = express.Router();    

ratingRouter.post('/company/:id', createCompanyRating);
ratingRouter.post('/destination/:id', createDestinationRating);
ratingRouter.post('/experience/:experienceId', reactToExperience);
