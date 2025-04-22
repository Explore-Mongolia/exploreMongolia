import mongoose from 'mongoose';

const { Schema } = mongoose;

export const UserSchema = new Schema ({
name : { type : String, required: true },
email : { type : String, required: true, unique: true },
timestamp : { type : Date, default: Date.now },
})