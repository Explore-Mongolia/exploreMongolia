import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const tripPlanSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  title: { type: String, default: "My Trip" },
  destinations: [{ type: String }],
  plan: [
    {
      day: Number,
      activities: [String],
    },
  ],
  transportation: { type: String },
  accommodations: [{ name: String, address: String }],
  notes: { type: String },
  createdByAI: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const TripPlanModel = model("TripPlan", tripPlanSchema);
