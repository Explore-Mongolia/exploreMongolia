import { Router } from "express";
import { generateTrip } from "../controller/ai/generate-trip.js";
import saveTrip from "../controller/ai/save-trip.js";
import updateTrip from "../controller/ai/update-trip.js"; 

export const aiRouter = Router();

aiRouter.post("/generate-trip", generateTrip);
aiRouter.post("/save-trip", saveTrip);
aiRouter.put("/trip/:id", updateTrip); 
