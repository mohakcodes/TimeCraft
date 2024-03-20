import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  expireTime: {
    type: Number,
    required: true
  },
  oauth2Client: {
    type: Object,
    required: true
  },
  calendar: {
    type: Object,
    required: true  
  }
});

export const User = mongoose.models['User'] || mongoose.model('User', userSchema);