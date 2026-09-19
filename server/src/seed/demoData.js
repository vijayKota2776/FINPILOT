export const dashboardData = {
  company: {
    name: "Skyline Traders Pvt. Ltd.",
    industry: "Distribution",
    location: "India",
    annualRevenue: "₹24.8 Cr",
    employees: 82,
    monthlyTransactions: "4,850",
    bankAccounts: 4,
    currency: "INR",
    financialYear: "April–March",
    isDemo: true
  },
  metrics: {
    totalIncome: "₹12,45,000",
    totalExpenses: "₹8,32,000",
    netProfit: "₹4,13,000",
    cashBalance: "₹6,78,240",
    accountsReceivable: "₹14,80,000",
    accountsPayable: "₹9,42,000"
  },
  cashFlowChart: [
    { date: "Apr 1", amount: 420000 },
    { date: "Apr 5", amount: 510000 },
    { date: "Apr 10", amount: 480000 },
    { date: "Apr 15", amount: 620000 },
    { date: "Apr 20", amount: 560000 },
    { date: "Apr 25", amount: 690000 },
    { date: "Apr 30", amount: 678240 }
  ]
};

export const transactions = [
  {
    id: "tx-1",
    date: "2025-04-02",
    description: "Razorpay Settlement",
    merchant: "Razorpay",
    amount: "₹45,000",
    type: "Credit",
    category: "Sales",
    status: "Reconciled",
    aiConfidence: "98%"
  },
  {
    id: "tx-2",
    date: "2025-04-03",
    description: "AWS India Services",
    merchant: "Amazon Web Services",
    amount: "₹12,500",
    type: "Debit",
    category: "Software & Cloud",
    status: "Needs Review",
    aiConfidence: "94%",
    aiExplanation: "Similar AWS transactions in this workspace have previously been categorized as Software & Cloud.",
    warnings: ["Missing supporting invoice."]
  },
  {
    id: "tx-3",
    date: "2025-04-04",
    description: "HDFC Bank Payment",
    merchant: "HDFC Bank",
    amount: "₹12,400",
    type: "Debit",
    category: "Bank Charges",
    status: "Reconciled",
    aiConfidence: "97%"
  },
  {
    id: "tx-4",
    date: "2025-04-05",
    description: "ABC Traders Payment",
    merchant: "ABC Traders",
    amount: "₹45,000",
    type: "Credit",
    category: "Accounts Receivable",
    status: "Reconciled",
    aiConfidence: "96%"
  },
  {
    id: "tx-5",
    date: "2025-04-06",
    description: "Amazon Business",
    merchant: "Amazon",
    amount: "₹8,750",
    type: "Debit",
    category: "Office Supplies",
    status: "Needs Review",
    aiConfidence: "94%"
  },
  {
    id: "tx-6",
    date: "2025-04-07",
    description: "TDS Payment",
    merchant: "Income Tax",
    amount: "₹3,200",
    type: "Debit",
    category: "Taxes",
    status: "Reconciled",
    aiConfidence: "99%"
  }
];

export const invoices = [
  { id: "inv-1", customer: "ABC Traders", amount: "₹45,000", dueDate: "Apr 20", status: "Paid" },
  { id: "inv-2", customer: "Global Retail Ltd.", amount: "₹78,000", dueDate: "Apr 28", status: "Pending" },
  { id: "inv-3", customer: "Sharma & Co.", amount: "₹32,000", dueDate: "Apr 15", status: "Overdue" },
  { id: "inv-4", customer: "NextGen Solutions", amount: "₹1,20,000", dueDate: "Apr 25", status: "Paid" }
];

export const bills = [
  { id: "bill-1", vendor: "AWS India", amount: "₹12,500", dueDate: "Apr 30", status: "Pending Review", aiConfidence: "94%", owner: "Rahul" },
  { id: "bill-2", vendor: "ABC Suppliers", amount: "₹2,40,000", dueDate: "May 05", status: "Pending Approval", aiConfidence: "89%", owner: "Priya" },
  { id: "bill-3", vendor: "OfficeMart", amount: "₹18,400", dueDate: "Apr 12", status: "Paid", aiConfidence: "99%", owner: "System" }
];

export const reconciliation = {
  summary: {
    total: 5000,
    matched: 4650,
    needsReview: 180,
    possibleDuplicates: 100,
    unexplained: 70
  },
  exceptionExample: {
    bank: { name: "ABC Suppliers", amount: "₹4,21,000" },
    ledger: { name: "ABC Suppliers", amount: "₹4,12,000" },
    difference: "₹9,000",
    aiRecommendation: "Potential match found, but the ledger amount differs by ₹9,000.",
    confidence: "78%"
  }
};

export const assistantResponses = {
  expenses: {
    response: `Here are your top 5 expense categories:

1. Raw Materials — ₹2,45,000
2. Salaries — ₹1,80,000
3. Rent — ₹75,000
4. Marketing — ₹42,000
5. Utilities — ₹28,000`,
    isSimulated: true
  },
  overdue: {
    response: "You have 1 overdue invoice: Sharma & Co. for ₹32,000. Would you like me to draft a reminder email?",
    isSimulated: true
  },
  cash: {
    response: "Your current cash balance is ₹6,78,240 across 4 bank accounts.",
    isSimulated: true
  },
  review: {
    response: "There are 180 transactions and 1 bill that need your review.",
    isSimulated: true
  }
};
