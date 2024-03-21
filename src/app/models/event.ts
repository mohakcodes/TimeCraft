import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    summary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    timeZone:{
        type: String,
        required: true,
    },
    eventLink: {
        type: String,
        required: true,
    },
    startDateTime:{
        type: String,
        required: true,
    },
    owner:{
        type:String,
        required:true,
    },
    flag:{
        type:Boolean,
        required:true,
    },
    access_token:{
        type:String,
        required:true,
    },
  }
);

export const Event = mongoose.models["Event"] || mongoose.model("Event", eventSchema);