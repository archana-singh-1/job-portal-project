import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import signupRoute from './routes/userRoute.js';
import employerRoutes from "./routes/employerRoutes.js";
import applyForJob from "./routes/applyRoute.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 4000;
const mongoPassword = process.env.MONGODB_PASSWORD;
const url = `mongodb+srv://aayushisharma1:${mongoPassword}@cluster0.jfztl.mongodb.net/Job_Portal`;


mongoose.connect(url)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error:", err));


app.use("/user", signupRoute);
app.use("/api/employer", employerRoutes);
app.use("/apply", applyForJob);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





//https://job-portal-project-theta.vercel.app