import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  legalName: { type: String, required: true },
  displayName: { type: String },
  businessType: { type: String },
  registrationNumber: { type: String },
  country: { type: String },
  industry: { type: String },
  kycStatus: { type: String, enum: ['PENDING', 'IN_REVIEW', 'VERIFIED', 'REJECTED'], default: 'PENDING' },
  kycVerifiedAt: { type: Date },
  authorizedRepresentativeUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  maxMembers: { type: Number, default: 4 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Company = mongoose.model('Company', companySchema);
