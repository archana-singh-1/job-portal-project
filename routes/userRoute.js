import express from "express"; 

import { signup, login,logout } from "../controllers/userController.js";

import { authenticate } from '../middleware/authMiddleware.js'; 

const route=express.Router()

route.post('/signup',signup)

route.post('/login',login);

route.post('/logout', authenticate, logout); 



export default route;


