
import express from "express"; 
import { upload,applyForJob } from '../controllers/Apply.js';


const router = express.Router();

router.post('/upload', upload.single('file'), applyForJob); // Use the upload middleware before the controller


export default router;