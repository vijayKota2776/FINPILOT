import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  provider: { type: String, required: true }, // e.g., 'HDFC Bank', 'Razorpay', 'Zoho'
  type: { type: String, enum: ['BANK', 'ACCOUNTING', 'PAYMENTS'], required: true },
  status: { type: String, enum: ['CONNECTED', 'SYNCING', 'ERROR', 'DISCONNECTED'], default: 'CONNECTED' },
  lastSyncedAt: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Connection = mongoose.model('Connection', connectionSchema);
