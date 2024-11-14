import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  jobType: String,
  applicants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      resumeUrl: String,
      appliedAt: { type: Date, default: Date.now },
    },
  ],
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
