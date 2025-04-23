import mongoose from "mongoose";

const { Schema, model } = mongoose;

const destinationsSchema = new Schema({
    name : { type: String },
    description : { type: String },
    mapCoordinate : { type : Object},
    vibesAvailable : { type: String },
    Budget : { type: String },
});

export const DestinationsModel = model("Destinations", destinationsSchema);