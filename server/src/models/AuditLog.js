import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., 'KYC_VERIFIED', 'BANK_CONNECTED'
  resource: { type: String }, // e.g., 'Connection', 'User'
  resourceId: { type: mongoose.Schema.Types.ObjectId },
  metadata: { type: mongoose.Schema.Types.Mixed }, // flexible data
}, { timestamps: true });

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
