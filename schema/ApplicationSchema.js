import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobSeekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resume: {
    type: String, 
    required: true
  },
  additionalDetails: {
    type: String
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

export const  Applicationmodel = mongoose.model('Application', applicationSchema);