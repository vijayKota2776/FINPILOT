import express from 'express';
import { Invoice } from '../models/Invoice.js';
import { authenticateUser } from '../middleware/auth.js';
import { requireWorkspaceMember } from '../middleware/authorization.js';

const router = express.Router({ mergeParams: true });

// --- Seed Helper ---
const generateMockInvoices = async (companyId) => {
  const customers = ['Acme Corp', 'Globex Inc', 'Soylent Corp', 'Initech', 'Umbrella Corp', 'Stark Industries'];
  const invoices = [];

  for (let i = 0; i < 15; i++) {
    const isPaid = Math.random() > 0.5;
    const isOverdue = !isPaid && Math.random() > 0.4;
    const isDraft = !isPaid && !isOverdue && Math.random() > 0.8;
    
    let status = 'SENT';
    if (isPaid) status = 'PAID';
    else if (isOverdue) status = 'OVERDUE';
    else if (isDraft) status = 'DRAFT';

    const amount = Math.floor(Math.random() * 800000) + 20000;
    
    const issueDate = new Date();
    issueDate.setDate(issueDate.getDate() - (Math.floor(Math.random() * 60) + 10)); // Issued 10-70 days ago
    
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 30); // Net 30 terms

    if (isOverdue && dueDate > new Date()) {
      // Force it to be actually overdue
      dueDate.setDate(new Date().getDate() - 5);
    }

    invoices.push({
      companyId,
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(i + 1).padStart(4, '0')}`,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      customerEmail: `billing@${customers[Math.floor(Math.random() * customers.length)].toLowerCase().replace(' ', '')}.com`,
      issueDate,
      dueDate,
      amount,
      currency: 'INR',
      status,
      items: [
        { description: 'Consulting Services', quantity: 1, price: amount * 0.7 },
        { description: 'Software License', quantity: 1, price: amount * 0.3 }
      ]
    });
  }

  await Invoice.insertMany(invoices);
};

// @route   GET /api/companies/:companyId/invoices
// @desc    Get invoices with optional filters and aggregate metrics
router.get('/:companyId/invoices', authenticateUser, requireWorkspaceMember, async (req, res) => {
  try {
    const { companyId } = req.params;
    const { search, status } = req.query;

    // Auto-seed if empty for demo purposes
    const count = await Invoice.countDocuments({ companyId });
    if (count === 0) {
      await generateMockInvoices(companyId);
    }

    // Build search query
    const query = { companyId };
    if (status && status !== 'ALL') query.status = status;
    
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { invoiceNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const invoices = await Invoice.find(query).sort({ issueDate: -1 });
    
    // Calculate aggregate metrics (ignoring the search filter, so metrics represent the whole company)
    const allInvoices = await Invoice.find({ companyId });
    
    const metrics = {
      totalOutstanding: 0,
      totalOverdue: 0,
      totalDraft: 0,
      totalPaidThisMonth: 0
    };

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    allInvoices.forEach(inv => {
      if (inv.status === 'SENT' || inv.status === 'OVERDUE') {
        metrics.totalOutstanding += inv.amount;
      }
      if (inv.status === 'OVERDUE') {
        metrics.totalOverdue += inv.amount;
      }
      if (inv.status === 'DRAFT') {
        metrics.totalDraft += inv.amount;
      }
      if (inv.status === 'PAID' && new Date(inv.updatedAt) >= firstDayOfMonth) {
        metrics.totalPaidThisMonth += inv.amount;
      }
    });
    
    res.json({ 
      success: true, 
      data: {
        invoices,
        metrics
      }
    });
  } catch (error) {
    console.error('Invoices fetch error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error fetching invoices' } });
  }
});

export default router;
