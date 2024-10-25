import express from "express"; 
import { signup, login } from "../controllers/userController.js";



const route=express.Router()

route.post('/signup',signup)

route.post('/login',login);


export default route;