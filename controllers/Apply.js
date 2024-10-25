

//job portal vala code 
// controllers/applyController.js
import multer from 'multer';
import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import Apply from '../schema/applySchema.js'; // Ensure this path is correct

// Firebase Admin Initialization
import serviceAccount from '../firebaseKey.json' assert { type: 'json' }; // Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'upload-22c26.appspot.com', // Your Firebase bucket name
});

const bucket = admin.storage().bucket();

// Multer Setup for File Upload (in-memory storage)
const upload = multer({
  storage: multer.memoryStorage(), // Files will be stored in memory temporarily
});

// Function to handle file upload and saving application data
const applyForJob = async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    // Generate a unique file name for Firebase
    const blob = bucket.file(`images/${uuidv4()}-${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    // Handle upload errors
    blobStream.on('error', (err) => {
      console.error('Upload error:', err);
      return res.status(500).send({ message: 'Error uploading file to Firebase', error: err.message });
    });

    // On finish of file upload
    blobStream.on('finish', async () => {
      try {
        // Generate a signed URL for the uploaded file
        const [url] = await blob.getSignedUrl({
          action: 'read',
          expires: '03-09-2491',
        });

        // Save application data to MongoDB
        const applyData = new Apply({
          whyHire: req.body.whyHire, // Storing whyHire data
          availability: req.body.availability, // Storing availability data
          resume: {
            firebaseUrl: url,
            uploadedAt: Date.now(),
            fileName: req.file.originalname,
          },
        });
        await applyData.save();

        // Send a success response
        res.send({
          message: 'Application submitted successfully',
          firebaseUrl: url,
        });
      } catch (err) {
        console.error('Error saving to MongoDB:', err);
        res.status(500).send({ message: 'Error saving application to MongoDB', error: err.message });
      }
    });

    // End the stream
    blobStream.end(req.file.buffer);
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).send({ message: 'Unexpected error occurred', error: err.message });
  }
};
export { upload, applyForJob };

