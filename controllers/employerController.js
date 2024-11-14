// import { Job } from "../schema/jobschema.js";
import { User } from "../schema/userSchema.js";


const createJob = async (req, res) => {
  const { title, description, employerId, location, salary, jobType } = req.body;

  // console.log("Request Body:", req.body);

  try {
    const employer = await User.findById(employerId);
    // console.log("Employer Found:", employer);

    if (!employer) {
      return res.status(400).json({ error: 'Invalid employer ID: User not found' });
    }

    if (employer.role !== 'Employer') {
      return res.status(400).json({ error: 'Invalid employer ID: User is not an Employer' });
    }

    const job = new Job({
      title,
      description,
      employerId,
      location,
      salary,
      jobType,
    });

    await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });
    console.log(res)
  } catch (error) {
    // console.error("Error while creating job:", error);
    res.status(500).json({ error: 'Failed to post job' });
  }
};




const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id).populate('employerId', 'name'); 

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    // console.error("Error fetching job by ID:", error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};





const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employerId', 'name'); 
    res.status(200).json(jobs);
  } catch (error) {
    // console.error("Error fetching all jobs:", error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};


export { createJob,getJobById,getAllJobs }