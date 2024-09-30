import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,    
    },
    email: {
        type: String,
        required: true,
        unique: true,   
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const UserSchemaModel = mongoose.model("User", UserSchema);
