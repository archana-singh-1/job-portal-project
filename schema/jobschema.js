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
        enum: ['fulltime', 'parttime',],
        required: true
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Jobmodel = mongoose.model('Job', jobSchema);






