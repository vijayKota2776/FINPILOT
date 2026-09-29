import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  counterparty: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['INFLOW', 'OUTFLOW'],
    required: true
  },
  category: {
    type: String,
    default: 'Uncategorized'
  },
  status: {
    type: String,
    enum: ['PENDING', 'CLEARED', 'RECONCILED'],
    default: 'CLEARED'
  },
  aiClassification: {
    confidence: { type: Number, default: 0 },
    suggestedCategory: { type: String },
    tags: [{ type: String }]
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
