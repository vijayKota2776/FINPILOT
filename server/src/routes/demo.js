import express from 'express';
import { dashboardData, transactions, invoices, bills, reconciliation, assistantResponses } from '../seed/demoData.js';

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json(dashboardData);
});

router.get('/transactions', (req, res) => {
  res.json(transactions);
});

router.get('/invoices', (req, res) => {
  res.json(invoices);
});

router.get('/bills', (req, res) => {
  res.json(bills);
});

router.get('/reconciliation', (req, res) => {
  res.json(reconciliation);
});

router.post('/assistant', (req, res) => {
  const { query } = req.body;
  
  // Very basic matching for demo purposes
  const normalizedQuery = query.toLowerCase();
  
  if (normalizedQuery.includes('expenses')) {
    return res.json(assistantResponses.expenses);
  } else if (normalizedQuery.includes('overdue')) {
    return res.json(assistantResponses.overdue);
  } else if (normalizedQuery.includes('cash')) {
    return res.json(assistantResponses.cash);
  } else if (normalizedQuery.includes('review')) {
    return res.json(assistantResponses.review);
  } else {
    return res.json({
      response: "I'm a simulated AI for this demo. Try asking me: 'Show my top 5 expenses this month' or 'Which invoices are overdue?'",
      isSimulated: true
    });
  }
});

export default router;
