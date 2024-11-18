
import mongoose from 'mongoose';

const applySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  whyHire: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String, 
    required: true,
  },
});

const Apply = mongoose.model('Apply', applySchema);
export default Apply;
