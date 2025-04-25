

import { TripPlanModel } from "../../models/tripPlan-schema.js";



export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email } = req.user; 


    const tripData = req.body;

    const tripPlan = await TripPlanModel.create({
      ...tripData,
      user: email,
      createdByAI: true,
    });

    res.status(200).json({ tripPlan });
  } catch (err) {
    console.error("Save Trip Error:", err);
    res.status(500).json({ error: "Failed to save trip" });
  }
}
