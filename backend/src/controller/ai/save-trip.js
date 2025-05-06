import { TripPlanModel } from "../../models/tripPlan-schema.js";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    const { userId } = req.params;
    const tripData = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    if (!tripData || !tripData.title) {
      return res.status(400).json({ error: "Missing trip data" });
    }

    const existingTrip = await TripPlanModel.findOne({
      user: userId,
      title: tripData.title, 
    });

    let tripPlan;

    if (existingTrip) {
    
      existingTrip.set({ ...tripData, createdByAI: true });
      tripPlan = await existingTrip.save();
    } else {
    
      tripPlan = await TripPlanModel.create({
        ...tripData,
        user: userId,  
        createdByAI: true,
      });
    }

    res.status(200).json({ tripPlan });
  } catch (err) {
    console.error("Save Trip Error:", err);
    res.status(500).json({ error: "Failed to save trip" });
  }
}
