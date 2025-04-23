import mongoose from "mongoose";

const { Schema } = mongoose;

const experiencesSchema = new Schema({
  name: { type: String },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  tripDates: {
    start: { type: Date },
    end: { type: Date }
  },
  visitedPlaces: [{ type: String }],
  totalCost: { type: Number },
  highlights: { type: String },
  dislikes: { type: String },
  tips: { type: String },
  vibes: [{ type: String }],
  images: [{ type: String }],
  video: { type: String },
});


export const ExperiencesModel = model("Experience", experiencesSchema);