import mongoose, { SchemaType } from "mongoose";

const { Schema, model } = mongoose;

const destinationSchema = new Schema({
    name: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, required: true, ref: "Company" }, 
    description: { type: String },
    destination : { type: String },
    vibesAvailable: [{ type: String }],
    cost: { type: String },
  });
  

export const DestinationModel = model("Destination", destinationSchema);