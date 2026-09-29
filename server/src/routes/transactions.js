import express from 'express';
import { Transaction } from '../models/Transaction.js';
import { authenticateUser } from '../middleware/auth.js';
import { requireWorkspaceMember } from '../middleware/authorization.js';

const router = express.Router({ mergeParams: true });

// --- Seed Helper ---
const generateMockTransactions = async (companyId) => {
  const categories = ['Software Subscriptions', 'Payroll', 'Legal', 'Marketing', 'Office Supplies', 'Revenue'];
  const counterparties = ['Stripe', 'AWS', 'Gusto', 'Google Ads', 'WeWork', 'Client A', 'Client B'];
  const transactions = [];

  for (let i = 0; i < 25; i++) {
    const isOutflow = Math.random() > 0.3;
    const amount = isOutflow ? -(Math.floor(Math.random() * 500000) + 1000) : (Math.floor(Math.random() * 2000000) + 50000);
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // Last 90 days

    transactions.push({
      companyId,
      date,
      amount,
      currency: 'INR',
      counterparty: counterparties[Math.floor(Math.random() * counterparties.length)],
      description: `Auto-generated transaction ${i}`,
      type: isOutflow ? 'OUTFLOW' : 'INFLOW',
      category: isOutflow ? categories[Math.floor(Math.random() * 5)] : 'Revenue',
      status: Math.random() > 0.1 ? 'CLEARED' : 'PENDING',
      aiClassification: {
        confidence: Math.floor(Math.random() * 40) + 60,
        suggestedCategory: isOutflow ? categories[Math.floor(Math.random() * 5)] : 'Revenue',
        tags: ['auto-synced']
      }
    });
  }

  await Transaction.insertMany(transactions);
};

// @route   GET /api/companies/:companyId/transactions
// @desc    Get transactions with optional filters
router.get('/:companyId/transactions', authenticateUser, requireWorkspaceMember, async (req, res) => {
  try {
    const { companyId } = req.params;
    const { search, type, category, status } = req.query;

    // Auto-seed if empty for demo purposes
    const count = await Transaction.countDocuments({ companyId });
    if (count === 0) {
      await generateMockTransactions(companyId);
    }

    const query = { companyId };

    if (type && type !== 'ALL') query.type = type;
    if (category && category !== 'ALL') query.category = category;
    if (status && status !== 'ALL') query.status = status;

    if (search) {
      query.$or = [
        { counterparty: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    
    res.json({ success: true, data: transactions });
  } catch (error) {
    console.error('Transactions fetch error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error fetching transactions' } });
  }
});

// @route   PATCH /api/companies/:companyId/transactions/:id
// @desc    Update a transaction (e.g. categorize it)
router.patch('/:companyId/transactions/:id', authenticateUser, requireWorkspaceMember, async (req, res) => {
  try {
    const { companyId, id } = req.params;
    const { category, notes } = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, companyId },
      { $set: { category, notes } },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ success: false, error: { message: 'Transaction not found' } });
    }

    res.json({ success: true, data: transaction });
  } catch (error) {
    console.error('Transaction update error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error updating transaction' } });
  }
});

export default router;
