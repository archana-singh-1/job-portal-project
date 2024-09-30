import express from "express"; 
import signup_data from "../controllers/signup";

const router=express.Router()

router.post("/signup_data",signup_data)

export default router;