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
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
    required: true 
  },  
  applicants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],


});

export const Job = mongoose.model('Job', jobSchema);
