// import Job from "../schema/jobschema.js";
// import { User } from "../schema/userSchema.js";


// const createJob = async (req, res) => {
//   const { title, description, employerId, location, salary, jobType } = req.body;

//   // console.log("Request Body:", req.body);

//   try {
//     const employer = await User.findById(employerId);
//     // console.log("Employer Found:", employer);

//     if (!employer) {
//       return res.status(400).json({ error: 'Invalid employer ID: User not found' });
//     }

//     if (employer.role !== 'Employer') {
//       return res.status(400).json({ error: 'Invalid employer ID: User is not an Employer' });
//     }

//     const job = new Job({
//       title,
//       description,
//       employerId,
//       location,
//       salary,
//       jobType,
//     });

//     await job.save();
//     res.status(201).json({ message: 'Job posted successfully', job });
//     console.log(res)
//   } catch (error) {
//     // console.error("Error while creating job:", error);
//     res.status(500).json({ error: 'Failed to post job' });
//   }
// };



// const getJobById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     console.log("Fetching Job with ID:", id); // Debugging log

//     const job = await Job.findById(id).populate('employerId', 'name'); // Populates employer name from User schema

//     if (!job) {
//       console.error("Job not found for ID:", id);
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     console.log("Job found:", job); // Debugging log
//     res.status(200).json(job);
//   } catch (error) {
//     console.error("Error in getJobById:", error);
//     res.status(500).json({ error: 'Failed to fetch job' });
//   }
// };






// const getAllJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find().populate('employerId', 'name'); 
//     res.status(200).json(jobs);
//   } catch (error) {
//     // console.error("Error fetching all jobs:", error);
//     res.status(500).json({ error: 'Failed to fetch jobs' });
//   }
// };


// export { createJob,getJobById,getAllJobs }










//main code

import Job from "../schema/jobschema.js";
import { User } from "../schema/userSchema.js";
//final h 
// const createJob = async (req, res) => {
//   const { title, description, employerId, location, salary, jobType, skills } = req.body; // Add 'skills' to the destructuring

//   try {
//     const employer = await User.findById(employerId);

//     if (!employer) {
//       return res.status(400).json({ error: 'Invalid employer ID: User not found' });
//     }

//     if (employer.role !== 'Employer') {
//       return res.status(400).json({ error: 'Invalid employer ID: User is not an Employer' });
//     }

//     const job = new Job({
//       title,
//       description,
//       employerId,
//       location,
//       salary,
//       jobType,
//       skills: skills.map((skill) => ({ name: skill })), // Map array of skill strings to objects with 'name'
//     });

//     await job.save();
//     res.status(201).json({ message: 'Job posted successfully', job });
//   } catch (error) {
//     console.error("Error while creating job:", error);
//     res.status(500).json({ error: 'Failed to post job' });
//   }
// };







const createJob = async (req, res) => {
    const userId = req.user.id; // Get user ID from the authenticated token

    try {
        // Validate the user role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== "Employer") {
            return res.status(403).json({ message: "Access denied: Only employers can create jobs" });
        }

        // Create a new job
        const { title, description, location, salary, jobType, skills } = req.body;

        const newJob = new Job({
            title,
            description,
            employerId: userId, // Associate job with the employer's user ID
            location,
            salary,
            jobType,
            skills,
        });

        const savedJob = await newJob.save();
        res.status(201).json({ message: "Job created successfully", job: savedJob });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id).populate('employerId', 'name'); // Populates employer name from User schema

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error in getJobById:", error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employerId', 'name'); // Fetch all jobs with employer details
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

export { createJob, getJobById, getAllJobs };