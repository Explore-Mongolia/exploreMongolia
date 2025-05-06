import { Router } from "express";
import { generateTrip } from "../controller/ai/generate-trip.js";
import saveTrip from "../controller/ai/save-trip.js";

export const aiRouter = Router();

aiRouter.post("/generate-trip", generateTrip);
aiRouter.post("/save-trip/:userId", saveTrip);
