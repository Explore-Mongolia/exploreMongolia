import mongoose, { SchemaType } from "mongoose";

const { Schema, model } = mongoose;

const destinationSchema = new Schema({
    name: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, required: true, ref: "Company" }, 
    description: { type: String, required: true },
    destination : { type: String, required: true },
    vibesAvailable: [{ type: String }],
    cost: { type: String, required: true },
    image: { type: String, required: true }
  });
  

export const DestinationModel = model("Destination", destinationSchema);