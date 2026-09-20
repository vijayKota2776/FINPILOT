import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import waitlistRoutes from './routes/waitlist.js';
import demoRoutes from './routes/demo.js';
import authRoutes from './routes/auth.js';
import companyRoutes from './routes/company.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Update this for production
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/finpilot';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/demo', demoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
