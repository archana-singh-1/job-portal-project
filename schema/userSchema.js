import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['employer', 'job_seeker'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});
  
export const UserSchemaModel = mongoose.model("User", userSchema );
