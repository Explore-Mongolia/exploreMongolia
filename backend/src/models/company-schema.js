import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companySchema = new Schema({
  name: { type: String, required: true },
  destinations: [{ type: Schema.Types.ObjectId, ref: "Destination" }],

  description: { type: String, required: true },
  contact: {
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
  },
  rating: { type: Number, min: 0, max: 5 },
  priceRange: { type: String },
  tags: [{ type: String }],
  profileImage: { type: String },
});

export const CompanyModel = model("Company", companySchema);


  // destinations: [{ type: Schema.Types.ObjectId, ref: "Destination" }],