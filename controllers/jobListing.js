import { Jobmodel } from "../schema/jobschema.js";


const postJob = async (req, res) => {
    const { title, description, company,location, salary, jobType,employerId } = req.body;
 
    try {
      const newJob = new Jobmodel({ title, description, company,location, salary, jobType ,employerId});
      const savedJob = await newJob.save();
      res.status(201).json(savedJob);
    } catch (error) {
      console.error("Error saving job:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  const listJobs = async (req, res) => {
    try {
      const jobs = await Jobmodel.find().populate('employerId', 'name email');
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const searchJobs = async (req, res) => {
    const { title, location } = req.query;

    try {
        const filters = {};
        if (title) filters.title = { $regex: title.trim(), $options: 'i' };  
        if (location) filters.location = { $regex: location.trim(), $options: 'i' };

        const jobs = await Jobmodel.find(filters).populate('employerId', 'name email');
        

        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error searching jobs:", error);
        res.status(500).json({ message: error.message });
    }
}
  
export { postJob, listJobs, searchJobs };