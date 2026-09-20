import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  role: { type: String, enum: ['MASTER_ADMIN', 'FINANCE_ADMIN', 'FINANCE_MEMBER'], required: true },
  tokenHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'EXPIRED', 'CANCELLED'], default: 'PENDING' },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  acceptedAt: { type: Date }
}, { timestamps: true });

export const Invitation = mongoose.model('Invitation', invitationSchema);
