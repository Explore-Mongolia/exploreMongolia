import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, default: 'default-profile-image-url' },
    bio: { type: String },
    location: { type: String },
    socialLinks: {
      twitter: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
    },
    website: { type: String },
    birthday: { type: Date },
    interests: [{ type: String }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    totalExperiences: { type: Number, default: 0 },
    experiencePrivacy: { type: String, enum: ['public', 'private'], default: 'public' },
    achievements: [{ type: String }],
    badges: [{ type: String }],
    recentActivity: [{ type: String }],
    userRating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    notifications: {
      email: { type: Boolean, default: true },
      appNotifications: { type: Boolean, default: true },
    },
    tripPlans: [{ type: Schema.Types.ObjectId, ref: "TripPlan" }],
    experiences: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
    accountCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
