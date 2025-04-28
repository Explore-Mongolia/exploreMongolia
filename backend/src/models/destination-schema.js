import mongoose from "mongoose";

const { Schema, model } = mongoose;

const destinationSchema = new Schema({
  name: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
  description: { type: String, required: true },
  cost: { type: String, required: true },
  vibesAvailable: [{ type: String }],
  image: { type: String, required: true }
});

export const DestinationModel = model("Destination", destinationSchema);
