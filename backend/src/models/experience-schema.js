import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  emoji: { type: String, required: true }, // e.g., "❤️", "😂", "😮"
}, { _id: false });

const experiencesSchema = new Schema(
  {
    name: { type: String },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    tripDates: {
      start: { type: Date },
      end: { type: Date },
    },
    visitedPlaces: [{ type: String }],
    totalCost: { type: Number },
    highlights: { type: String },
    dislikes: { type: String },
    description: { type: String },
    tips: { type: String },
    vibes: [{ type: String }],
    images: [{ type: String }],
    video: { type: String },
    reactions: [reactionSchema],
  },
  { timestamps: true } 
);

export const ExperiencesModel = model("Experience", experiencesSchema);
