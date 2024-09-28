import express from "express";


const PORT=process.env.PORT;

const app=express();
app.use(express.json());



app.get ("/", function(req,resp){
    resp.send("Server is running")
});


app.listen(PORT,function(){
    console.log("Server is running on port 4000")
});
