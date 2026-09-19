import mongoose from 'mongoose';

const waitlistUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  companySize: { type: String, required: true },
  automationInterest: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const WaitlistUser = mongoose.model('WaitlistUser', waitlistUserSchema);
