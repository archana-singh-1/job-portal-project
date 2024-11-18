import Job from '../schema/jobschema.js'; 
import { v4 as uuidv4 } from 'uuid';
import admin from 'firebase-admin';
import multer from 'multer';
import Joi from 'joi';
import serviceAccount from '../firebaseKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'upload-22c26.appspot.com',
});

const bucket = admin.storage().bucket();

const upload = multer({
  storage: multer.memoryStorage(),
});

const applySchema = Joi.object({
  jobId: Joi.string().required(), 
});

const validateApply = (req, res, next) => {
  const { error } = applySchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  next();
};

const applyForJob = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: 'Resume file is required' });
    }

    const { jobId } = req.body;

    const fileName = `${uuidv4()}_${req.file.originalname}`;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on('error', (err) => {
      console.error('File upload error:', err);
      return res.status(500).send({ error: 'Failed to upload file' });
    });

    stream.on('finish', async () => {
      try {
        await file.makePublic();
        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        const applicantData = {
          userId: req.user.id, 
          name: req.user.name,  
          resumeUrl: fileUrl,
          appliedAt: new Date(),
        };

        const job = await Job.findByIdAndUpdate(
          jobId,
          { $push: { applicants: applicantData } },
          { new: true }
        );

        if (!job) {
          return res.status(404).send({ error: 'Job not found' });
        }

        return res.status(201).send({
          message: 'Application submitted successfully',
          job,
        });
      } catch (err) {
        console.error('Database save error:', err);
        return res.status(500).send({ error: 'Failed to save application data' });
      }
    });

    stream.end(req.file.buffer);
  } catch (err) {
    console.error('Application error:', err);
    res.status(500).send({ error: 'An error occurred while applying for the job' });
  }
};

export { upload, applyForJob, validateApply };
