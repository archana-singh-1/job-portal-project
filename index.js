import express from "express";
import mongoose from 'mongoose';
import router from './routes/hiring-route.js'


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





const mongoPassword = process.env.MONGODB_PASSWORD
const url = `mongodb+srv://aayushisharma1:${mongoPassword}@cluster0.jfztl.mongodb.net/Job_Protal`
mongoose.connect(url)
.then(()=>{
    console.log("Connect Done")
})
.catch((err)=>{
    console.log(err)
})



app.use(express.json());

app.use('/hiring',router)

app.listen(PORT,function(){
    console.log("Server is running on port 4000")
});
