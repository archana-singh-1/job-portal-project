
import express from "express"; 
import { applyForJob } from '../controllers/Apply.js';

const router = express.Router();

router.post("/apply-job/:jobId", applyForJob);


export default router;
