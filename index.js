import express from "express";
import mongoose from 'mongoose';
import router from './routes/hiring-route.js'
import signup from './routes/signupRoute.js'
import login from "./routes/signupRoute.js"


const app=express();
app.use(express.json());
const PORT=process.env.PORT;

const mongoPassword = process.env.MONGODB_PASSWORD
const url = `mongodb+srv://aayushisharma1:${mongoPassword}@cluster0.jfztl.mongodb.net/Job_Protal`
mongoose.connect(url)
.then(()=>{
    console.log("Connect Done")
})
.catch((err)=>{
    console.log(err)
})

mongoose.connect(url)
.then(()=>{
    console.log("Connect Done")
})
.catch((err)=>{
    console.log(err)
})



app.use('/hiring',router)
app.use("/user",signup)
app.use("/login",login)

app.listen(PORT,function(){
    console.log("Server is running on port 4000")
});
