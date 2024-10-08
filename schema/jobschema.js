import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  jobType: {
    type: String,
    enum: ['fulltime', 'parttime', 'remote'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Jobmodel = mongoose.model('Job', jobSchema);
