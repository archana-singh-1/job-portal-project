import express from "express";
import { postJob, listJobs, searchJobs } from "../controllers/jobListing.js";

const jobRouter = express.Router();

jobRouter.post('/post-job', postJob);
jobRouter.get('/list-jobs', listJobs);
jobRouter.get('/search-jobs', searchJobs);

export default jobRouter;
