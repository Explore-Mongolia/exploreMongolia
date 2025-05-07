import mongoose from "mongoose";

const { Schema, model } = mongoose;

const destinationSchema = new Schema({
  name: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
  description: { type: String, required: true },
  cost: { type: String, required: true },
  vibesAvailable: [{ type: String }],
  ratings: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      ratedAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: { type: Number, default: 0 },

  image: { type: String, required: true },

  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: {
      type: [Number], 
      required: true,
    },
  },
});

// Create a geospatial index for the coordinates
destinationSchema.index({ location: "2dsphere" });

export const DestinationModel = model("Destination", destinationSchema);
