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
  ratings: {
    type: [{
      user: { type: Schema.Types.ObjectId, ref: "User" }, 
      rating: { type: Number, min: 1, max: 5 }, 
      ratedAt: { type: Date, default: Date.now } 
    }],
    default: []
  },
  averageRating: { type: Number, default: 0 }, 
  priceRange: { type: String },
  tags: [{ type: String }],
  profileImage: { type: String },
});

export const CompanyModel = model("Company", companySchema);
