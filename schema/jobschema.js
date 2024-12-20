// import mongoose from 'mongoose';

// const jobSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
//   jobType: String,
//   salary:String,
//   location:String,
//   applicants: [
//     {
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       name: String,
//       resumeUrl: String,
//       appliedAt: { type: Date, default: Date.now },
//     },
//   ],
// });

// const Job = mongoose.model('Job', jobSchema);

// export default Job;





//main filal waala
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Freelance', 'Internship'], // Valid job types
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    skills: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
    applicants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        resumeUrl: {
          type: String,
          required: true,
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
