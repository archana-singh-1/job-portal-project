import express from "express";

const PORT=process.env.PORT;

const app=express();

app.get ("/", function(req,resp){
    resp.send("done")
});


app.listen(PORT,function(){
    console.log("Server is running on port 4000")
});
