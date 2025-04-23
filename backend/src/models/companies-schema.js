import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companiesSchema = new Schema({
  name: { type: String },
  destinations: { type: String },
  descriptions: { type: String },
  contact: { type: Object },
  contactPhoneNumber: { type: Number },
  contactEmail: { type: String },
  contactWebsite: { type: String },
  rating: { type: Number },
  priceRange: { type: String },
  tags: { type: String },
  image: { type: String },
});

export const CompaniesModel = model("Campanies" , companiesSchema);

