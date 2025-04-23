

import { Router } from "express";
import { generateTrip } from "../controller/ai/generate-trip.js";




export const aiRouter = Router();


aiRouter.post("/generate-trip", generateTrip);