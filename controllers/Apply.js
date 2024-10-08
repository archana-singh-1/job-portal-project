import { Applicationmodel } from "../schema/ApplicationSchema.js"; 
import { Jobmodel } from "../schema/jobschema.js";

const applyForJob = async (req, res) => {
    const jobSeekerId = req.userId; 
    const { jobId } = req.params;
    const { resume, additionalDetails } = req.body;

    try {

        const job = await Jobmodel.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

    
        const existingApplication = await Applicationmodel.findOne({
            jobId,
            jobSeekerId
        });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        const newApplication = new Applicationmodel({
            jobId,
            jobSeekerId,
            resume,
            additionalDetails
        });

        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { applyForJob };
