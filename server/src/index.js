import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import waitlistRoutes from './routes/waitlist.js';
import demoRoutes from './routes/demo.js';
import authRoutes from './routes/auth.js';
import companyRoutes from './routes/company.js';
import invitationsRoutes from './routes/invitations.js';
import dashboardRoutes from './routes/dashboard.js';
import transactionRoutes from './routes/transactions.js';
import invoiceRoutes from './routes/invoices.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Set security HTTP headers
app.use(helmet());

// Global Rate limiting
const limiter = rateLimit({
  max: 500, // Limit each IP to 500 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10kb' })); // Limit body payload
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

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
app.use('/api/companies', invitationsRoutes);
app.use('/api/companies', dashboardRoutes);
app.use('/api/companies', transactionRoutes);
app.use('/api/companies', invoiceRoutes);
app.use('/api/companies', aiRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/demo', demoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
