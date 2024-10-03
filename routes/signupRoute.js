import express from "express"; 
import signup_data from "../controllers/signup.js";
import login_data from "../controllers/login.js";

const route=express.Router()

route.post('/signup',signup_data)
route.post('/login', login_data);

export default route;