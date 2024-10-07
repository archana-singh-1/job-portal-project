import mongoose from "mongoose";

const companyCollection = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },

    country:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    Number_openings:{
        type:Number,
        required:true

    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  
        required: true
    }
    
})

const Company= mongoose.model("company",companyCollection)
export default Company;