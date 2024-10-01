import express from "express"; 
import {post_data,get_data} from '../controllers/hiring.js';
// import { get_data } from "../controllers/hiring.js";

const router=express.Router()

router.post("/post_data",post_data)
router.get('/get',get_data)

export default router;