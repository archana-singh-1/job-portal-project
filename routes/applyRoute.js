
import express from "express"; 
import { applyForJob } from '../controllers/Apply.js';
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/apply-job/:jobId", upload.single('resume'), applyForJob);


export default router;
