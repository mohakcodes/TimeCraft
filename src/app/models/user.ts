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
  access_token: {
    type: String,
    required: true
  }
});

export const User = mongoose.models['User'] || mongoose.model('User', userSchema);