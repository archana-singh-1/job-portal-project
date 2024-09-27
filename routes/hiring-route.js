import express from "express"; 
import post_data from '../controllers/hiring.js';

const router=express.Router()

router.post("/post_data",post_data)

export default router;