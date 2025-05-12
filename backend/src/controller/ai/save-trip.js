import { TripPlanModel } from "../../models/tripPlan-schema.js";
import { UserModel } from "../../models/user-schema.js"; 
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    const { userId } = req.query;
    const tripData = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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

      
      user.tripPlans.push(tripPlan._id);
      await user.save();
    }

    res.status(200).json({ tripPlan, userId });
  } catch (err) {
    console.error("Save Trip Error:", err);
    res.status(500).json({ error: "Failed to save trip" });
  }
}
