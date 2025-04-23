import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companySchema = new Schema({
  name: { type: String, required: true },
  destinations: [{ type: Schema.Types.ObjectId, ref: "Destinations" }], // use array for multiple
  description: { type: String }, 
  contact: {
    phoneNumber: { type: String }, 
    email: { type: String },
    website: { type: String },
  },
  rating: { type: Number, min: 0, max: 5 },
  priceRange: { type: String },
  tags: [{ type: String }], 
  image: { type: String },
});


export const CompanyModel = model("Company" , companySchema);

