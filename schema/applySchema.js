import mongoose from "mongoose";

const applySchema = new mongoose.Schema({
  whyHire: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  resume: {
    firebaseUrl: {
      type: String, 
    },
    uploadedAt: {
      type: Date,
      default: Date.now, 
    },
    fileName: {
      type: String, 
      required: true,
    },
  },
});

const Apply = mongoose.model("Apply", applySchema);
export default Apply;

