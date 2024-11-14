import express from "express"; 

import { upload,applyForJob } from '../controllers/Apply.js';

import { authenticate } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/upload', authenticate, upload.single('file'), applyForJob);


export default router;