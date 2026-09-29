# FINPILOT Dashboard System Specification

## 1. Purpose

The FINPILOT Dashboard is the executive-level financial control center for a company workspace.

Its primary question is:

> **"What is the current financial health of this company, and what requires my attention?"**

The Dashboard should aggregate financial information from the company's underlying financial modules and present it in a concise, actionable way.

The Dashboard is not intended to replace detailed financial modules.

---

# 2. Existing FINPILOT Context

The Dashboard must integrate with the existing FINPILOT application.

Current architecture includes:

- React + Vite frontend
- JavaScript
- Tailwind CSS
- Express + Node.js backend
- MongoDB + Mongoose
- HTTP-only JWT cookie authentication
- Multi-tenant company/workspace architecture
- RBAC
- Workspace switching
- Existing onboarding flow
- Existing Reconciliation module
- Existing financial charts using Recharts
- Existing development seed data

Do not rebuild authentication or workspace architecture.

The Dashboard must use the existing authenticated workspace context.

---

# 3. Dashboard Product Principle

The Dashboard should follow:

```text
SEE
  ↓
UNDERSTAND
  ↓
DECIDE
  ↓
ACT
```

### SEE

Show:

- Cash
- Revenue
- Expenses
- Net cash flow
- Runway

### UNDERSTAND

Show:

- Cash-flow trends
- Revenue vs expenses
- Receivables
- Payables
- Reconciliation health
- Financial accounts
- AI signals

### DECIDE

Highlight:

- What requires attention
- What changed
- What is unusual
- What may become a problem

### ACT

Provide links/actions to:

- Reconciliation
- Transactions
- Invoices
- Connections
- Command Center
- Other relevant modules

---

# 4. Dashboard vs Other Modules

The Dashboard should not duplicate detailed module functionality.

```text
DASHBOARD
"How is my company doing?"

RECONCILIATION
"What financial transactions need review?"

TRANSACTIONS
"What actually happened?"

INVOICES
"What do we need to collect or pay?"

COMMAND CENTER
"What finance actions are happening?"

ASK FINPILOT
"Explain my financial data."
```

The Dashboard is the high-level aggregation layer.

---

# 5. Overall Dashboard Structure

```text
FINPILOT DASHBOARD
│
├── Header / Workspace Context
│
├── Financial Snapshot
│   ├── Cash Balance
│   ├── Revenue
│   ├── Expenses
│   ├── Net Cash Flow
│   └── Runway
│
├── Cash Flow
│   ├── Cash In
│   ├── Cash Out
│   └── Net Cash Flow Trend
│
├── Revenue vs Expenses
│
├── Cash & Runway
│   ├── Current Cash
│   ├── Monthly Burn
│   ├── Average Burn
│   └── Runway
│
├── Accounts Overview
│
├── Receivables
│
├── Payables
│
├── Reconciliation Health
│
├── AI Financial Signals
│
├── Action Center
│
└── Recent Financial Activity
```

---

# 6. Dashboard Header

The top of the Dashboard should show:

```text
ABC Technologies
Finance Workspace

[Financial Period]

[Refresh]

[Notifications]

[User / Profile]
```

If the user belongs to multiple companies, use the existing workspace switcher.

Example:

```text
ABC Technologies ▼
```

The selected workspace determines which company's financial data is displayed.

---

# 7. Global Date / Period Selector

The Dashboard should have a global period selector.

Options:

```text
This Month
Last Month
Last 3 Months
Last 6 Months
This Year
Custom
```

Where applicable, dashboard metrics and charts should respond to the selected period.

Examples:

- Revenue
- Expenses
- Cash flow
- Receivables
- Payables
- Transaction activity

Runway may use current cash and historical burn rather than simply applying the selected display period.

---

# 8. Financial Snapshot

The first major section should provide the most important financial numbers.

Recommended cards:

```text
Cash Balance
Revenue
Expenses
Net Cash Flow
Runway
```

---

## 8.1 Cash Balance

Example:

```text
CASH BALANCE

₹48.6L

+4.8% vs last month

Available across connected accounts
```

Source:

```text
Connected bank/cash accounts
```

---

## 8.2 Revenue

Example:

```text
REVENUE

₹12.4L

This month

↑ 8.2% vs previous month
```

Revenue should be based on categorized financial data.

---

## 8.3 Expenses

Example:

```text
EXPENSES

₹8.7L

This month

↓ 2.4% vs previous month
```

Expenses should be based on categorized financial transactions/financial records.

---

## 8.4 Net Cash Flow

Example:

```text
NET CASH FLOW

+₹3.7L

This month

Revenue − Expenses
```

---

## 8.5 Runway

Example:

```text
RUNWAY

7.4 months

Based on average monthly burn
```

Runway is particularly important for startup-focused customers.

---

# 9. Cash Flow Section

The Dashboard should include a primary cash-flow visualization.

It should communicate:

```text
Money In
Money Out
Net Cash Flow
```

Suggested time ranges:

```text
7D
30D
3M
6M
12M
Custom
```

Example conceptual data:

```text
Month    Cash In    Cash Out    Net
Apr      ₹9.2L      ₹7.4L       +₹1.8L
May      ₹10.1L     ₹8.2L       +₹1.9L
Jun      ₹11.4L     ₹8.9L       +₹2.5L
Jul      ₹10.8L     ₹9.1L       +₹1.7L
Aug      ₹12.1L     ₹8.5L       +₹3.6L
Sep      ₹12.4L     ₹8.7L       +₹3.7L
```

Use the existing Recharts dependency.

The visualization style should follow the existing FINPILOT design system.

---

# 10. Revenue vs Expenses

The Dashboard should show whether the business is generating more money than it is spending.

Example:

| Month | Revenue | Expenses | Net |
|---|---:|---:|---:|
| Apr | ₹9.2L | ₹7.4L | +₹1.8L |
| May | ₹10.1L | ₹8.2L | +₹1.9L |
| Jun | ₹11.4L | ₹8.9L | +₹2.5L |
| Jul | ₹10.8L | ₹9.1L | +₹1.7L |
| Aug | ₹12.1L | ₹8.5L | +₹3.6L |
| Sep | ₹12.4L | ₹8.7L | +₹3.7L |

The exact visualization can be a clean Recharts comparison chart.

---

# 11. Cash and Runway Analysis

The Dashboard should communicate:

```text
Current Cash
₹48.6L

Average Monthly Burn
₹6.5L

Runway
7.4 months
```

Potential supporting metrics:

- Gross burn
- Net burn
- Current-month burn
- 3-month average burn
- 6-month average burn
- Projected cash balance

For the prototype, calculations can use deterministic mock financial data.

Do not imply that forecasts are guaranteed.

---

# 12. Accounts Overview

Show where company cash currently sits.

Example:

```text
CONNECTED ACCOUNTS

HDFC Bank
Operating Account
₹21.4L

ICICI Bank
Business Account
₹17.8L

Axis Bank
Savings
₹9.4L

TOTAL
₹48.6L
```

The underlying model should support:

- Bank accounts
- Cash accounts
- Other connected financial accounts

The Dashboard should link to the Connections area for detailed management.

For now, use simulated financial connections where real integrations are not available.

---

# 13. Accounts Receivable

The Dashboard should summarize money expected from customers.

Example:

```text
ACCOUNTS RECEIVABLE

₹18.4L
Outstanding

₹7.2L
Due this week

₹3.1L
Overdue
```

Also show:

```text
Expected Inflow

Next 7 days
₹7.2L

Next 30 days
₹14.8L
```

This section should eventually connect to the Accounts Receivable module.

---

# 14. Accounts Payable

The Dashboard should summarize money the company needs to pay.

Example:

```text
ACCOUNTS PAYABLE

₹11.6L
Outstanding

₹4.2L
Due this week

₹1.8L
Overdue
```

This should eventually connect to Accounts Payable / Bills.

---

# 15. Reconciliation Health

The existing Reconciliation page is the detailed control room.

The Dashboard should only summarize its health.

The current Reconciliation concepts include:

- Total transactions
- Matched
- Review
- Duplicate
- AI signals
- Classification
- Confidence
- Human review

Example Dashboard summary:

```text
RECONCILIATION HEALTH

200
Total Transactions

145
Matched

30
Needs Review

25
Duplicates / Exceptions

AI Signal Quality
94%
```

Include:

```text
View reconciliation →
```

which opens the existing Reconciliation page.

Do not reproduce the full reconciliation table on the Dashboard.

---

# 16. AI Financial Signals

The Dashboard should eventually provide financial intelligence.

Examples:

### Spending anomaly

```text
UNUSUAL SPENDING

Software expenses increased 21%
compared with your 3-month average.

₹2.4L → ₹2.9L

[Investigate]
```

### Cash warning

```text
CASH SIGNAL

Projected cash balance may fall
below your operating threshold
within 3 months.

[View forecast]
```

### Revenue signal

```text
REVENUE SIGNAL

Customer receipts increased
14% compared with last month.

[View revenue]
```

### Reconciliation signal

```text
RECONCILIATION

30 transactions require human review.

[Review now]
```

AI should provide signals and recommendations.

It should not silently make irreversible accounting decisions.

---

# 17. Action Center

The Dashboard should tell the user what requires attention.

Example:

```text
ACTION CENTER

⚠ 12 transactions need review
   Reconciliation
   [Review]

⚠ ₹1.8L in invoices are overdue
   Accounts Receivable
   [View]

⚠ HDFC Bank hasn't synced for 18 hours
   Connections
   [Reconnect]

✓ 24 transactions automatically matched
   Reconciliation
   [View]

⚠ Software expenses increased 21%
   Expense Analysis
   [Investigate]
```

Actions should deep-link into the relevant product module.

This is an important differentiator for FINPILOT.

The Dashboard should not merely report numbers; it should help users decide what to do next.

---

# 18. Recent Financial Activity

Show a small list of important recent financial events.

Example:

```text
RECENT ACTIVITY

Razorpay Software Services
-₹1,18,000
Software & SaaS

Infosys Limited
+₹73,239
Customer Receipts

ICICI Bank Transfer
-₹69,403
Operating Expenses
```

Use the type of financial information already represented in the Reconciliation system.

Limit this to approximately 5–10 relevant records.

Include:

```text
View all transactions →
```

Do not turn the Dashboard into a full transaction table.

---

# 19. Dashboard Data Architecture

The Dashboard should aggregate data from the company's financial entities.

Conceptually:

```text
COMPANY
   │
   ├── Bank Accounts
   ├── Transactions
   ├── Invoices
   ├── Bills
   ├── Customers
   ├── Vendors
   ├── Reconciliation
   └── Connections
          │
          ▼
      DASHBOARD
```

Transaction data contributes to:

```text
Revenue
Expenses
Cash In
Cash Out
Net Cash Flow
```

Other financial modules contribute:

```text
Invoices → Receivables
Bills → Payables
Connections → Account balances
Reconciliation → Matching health
AI → Financial signals
```

---

# 20. Dashboard API

Prefer a dedicated aggregated endpoint rather than making the frontend request many unrelated endpoints.

Suggested endpoint:

```text
GET /api/companies/:companyId/dashboard
```

Suggested response:

```javascript
{
  summary: {
    cashBalance,
    revenue,
    expenses,
    netCashFlow,
    runway
  },

  cashFlow: [],

  revenueVsExpenses: [],

  accounts: [],

  receivables: {
    outstanding,
    dueSoon,
    overdue
  },

  payables: {
    outstanding,
    dueSoon,
    overdue
  },

  reconciliation: {
    total,
    matched,
    review,
    duplicate,
    signalQuality
  },

  signals: [],

  recentActivity: [],

  actions: []
}
```

The exact shape may be adapted to existing backend conventions.

---

# 21. Workspace Security

The Dashboard must always operate inside the authenticated company/workspace context.

Every request must:

```text
Authenticate user
      ↓
Identify workspace
      ↓
Verify membership
      ↓
Verify permissions
      ↓
Fetch only that company's data
```

Never trust a company ID from the frontend without checking membership on the server.

A user belonging to Company A must never receive Company B's dashboard data.

---

# 22. Multi-Workspace Support

The existing workspace switcher should control the Dashboard.

Example:

```text
ABC Technologies ▼
```

Switching to:

```text
XYZ Ventures
```

must update all Dashboard information to XYZ Ventures.

Never mix financial data between workspaces.

---

# 23. Loading States

The Dashboard should have polished loading states.

Avoid a blank screen while the API loads.

Use:

- Skeleton cards
- Chart skeletons
- Activity skeletons
- Signal skeletons

The loading state should match the FINPILOT design system.

---

# 24. Empty States

If the company has no financial data:

```text
Your financial workspace is ready.

Connect a bank account or import financial data
to start seeing your financial health here.

[Connect Account]
[Import CSV]
```

If there are no receivables:

```text
No outstanding receivables.
```

If there are no alerts:

```text
Everything looks clear.

No actions require your attention right now.
```

---

# 25. Error States

If dashboard data fails:

```text
We couldn't load your financial overview.

[Try again]
```

Do not show raw backend errors.

Do not expose database errors or implementation details.

---

# 26. Refresh Behavior

Provide a Dashboard refresh action.

The refresh should reload the dashboard data for the current workspace and selected period.

Do not refresh the entire browser unnecessarily.

---

# 27. Responsive Behavior

Desktop should be the primary experience because FINPILOT is a B2B finance platform.

Still support:

- Tablet
- Mobile

On smaller screens:

- Cards stack
- Charts resize
- Tables become scrollable or condensed
- Action Center remains accessible
- Workspace context remains visible

---

# 28. Design Direction

The screenshot supplied for the Reconciliation page is a reference for **financial information and data concepts only**.

It is NOT the design reference for the Dashboard.

Do not copy the screenshot's:

- Layout
- Colors
- Spacing
- Typography
- Cards
- Navigation
- Visual styling

Use the existing FINPILOT product design system.

The Dashboard should feel:

- Premium
- Modern
- Financial
- Professional
- Calm
- Data-dense but readable
- Executive-friendly

Avoid:

- Generic admin dashboard templates
- Excessive gradients
- Excessive rounded cards
- Unnecessary illustrations
- Overly colorful UI
- Huge decorative elements
- Dashboard clutter

---

# 29. MVP Dashboard

For the first implementation, prioritize:

## Must Have

1. Workspace header
2. Period selector
3. Cash balance
4. Revenue
5. Expenses
6. Net cash flow
7. Runway
8. Cash-flow chart
9. Revenue vs expenses chart
10. Accounts overview
11. Receivables summary
12. Payables summary
13. Reconciliation health
14. Action Center
15. Recent activity

## Second Phase

16. AI financial signals
17. Cash forecast
18. More detailed account analysis
19. Advanced period comparisons
20. Custom dashboard preferences

## Later

21. Predictive financial alerts
22. AI-generated financial summaries
23. Scenario planning
24. Budget vs actual
25. Forecasting
26. Automated recommendations

---

# 30. Final Dashboard Mental Model

```text
                    DASHBOARD
                        │
          ┌─────────────┴─────────────┐
          │                           │
     FINANCIAL HEALTH             ATTENTION
          │                           │
    ┌─────┼─────┐              ┌─────┼─────┐
    │     │     │              │     │     │
   CASH REVENUE RUNWAY       ACTIONS AI   ALERTS
    │     │     │              │     │     │
    └─────┼─────┘              └─────┼─────┘
          │                           │
          └─────────────┬─────────────┘
                        │
                     ACT
                        │
       ┌────────────────┼────────────────┐
       │                │                │
       ▼                ▼                ▼
 RECONCILIATION    TRANSACTIONS       INVOICES
```

The Dashboard is the company's financial control center.

Its job is not to contain every piece of financial data.

Its job is to turn the underlying financial data into:

```text
Visibility
    ↓
Understanding
    ↓
Priorities
    ↓
Action
```

---

# 31. Success Criteria

The Dashboard is successful when a company owner/finance user can open it and understand within seconds:

1. How much cash the company has.
2. How much revenue it generated.
3. How much it spent.
4. Whether cash flow is positive or negative.
5. How much runway remains.
6. What money is expected to come in.
7. What money needs to go out.
8. Whether reconciliation is healthy.
9. Whether anything unusual is happening.
10. What they should act on next.

That is the core purpose of the FINPILOT Dashboard.
