import { TripPlanModel } from "../../models/tripPlan-schema.js";

export default async function handler(req, res) {
  try {
    const { userId } = req.params; 
    const tripData = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in params" });
    }

    const tripPlan = await TripPlanModel.create({
      ...tripData,
      user: userId,
      createdByAI: true,
    });

    res.status(200).json({ tripPlan });
  } catch (err) {
    console.error("Save Trip Error:", err);
    res.status(500).json({ error: "Failed to save trip" });
  }
}
