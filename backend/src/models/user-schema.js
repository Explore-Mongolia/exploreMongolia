import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String }, 
    tripPlans: [{ type: Schema.Types.ObjectId, ref: "TripPlan" }],
  },
  { timestamps: true }
);

export const userModel = model("User", userSchema);
