import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import predictRoutes from './routes/predictRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));  // Allow requests from the frontend (localhost:5173)
app.use(express.json());  // Parse JSON data in requests
app.use('/uploads', express.static('uploads'));  // Serve uploaded files statically

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/predict', predictRoutes);  // Prediction routes

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch((err) => console.log(err));

