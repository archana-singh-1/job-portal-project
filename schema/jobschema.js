import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
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
    },
    employerId: {  // Add this field
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',  // Reference the Employer (or User) model
        required: true
    }
});

export const Jobmodel = mongoose.model('Job', jobSchema);
