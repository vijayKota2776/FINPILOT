import mongoose from 'mongoose';

const companyMemberSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['MASTER_ADMIN', 'FINANCE_ADMIN', 'FINANCE_MEMBER'], required: true },
  status: { type: String, enum: ['INVITED', 'ACTIVE', 'SUSPENDED', 'REMOVED'], default: 'ACTIVE' },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Ensure a user can only have one active membership per company
companyMemberSchema.index({ companyId: 1, userId: 1 }, { unique: true });

export const CompanyMember = mongoose.model('CompanyMember', companyMemberSchema);
