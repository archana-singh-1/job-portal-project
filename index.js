import express from "express";

const app=express();

app.get ("/", function(req,resp){
    resp.send("Server is running")
});


app.listen(4000,function(){
    console.log("Server is running on port 4000")
});
