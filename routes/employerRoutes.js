import express from "express";
import { createJob ,getJobById,getAllJobs} from "../controllers/employerController.js";

import { authenticate } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/jobs', authenticate,createJob);

router.get('/jobs/:id', getJobById);

router.get('/jobs', getAllJobs);


export default router;






