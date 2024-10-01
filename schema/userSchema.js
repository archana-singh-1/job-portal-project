import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],    
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,   
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], 
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"], 
    },
});

export const UserSchemaModel = mongoose.model("User", UserSchema);
