# FINPILOT

**AI-Powered Finance for Indian SMBs**

FINPILOT is an intelligent financial workspace designed specifically to help Indian small and medium-sized businesses manage their finances, automate repetitive accounting tasks, and gain deep insights into their business performance—all in one unified platform.

---

## 🚀 Features

### 1. Interactive Demo Workspace
A fully functional frontend Single Page Application (SPA) demonstrating the core workflows:
- **Dashboard**: High-level financial overview with interactive Cash Flow bar charts (powered by Recharts).
- **Transactions**: Filterable and sortable banking activity list with automatic categorization tags.
- **AI Reconciliation**: An intuitive dual-pane workflow that uses AI to match bank transactions against ledger entries, featuring a one-click "Approve" system.
- **AI Assistant**: A chat interface that allows you to query your financial data (e.g., "Show my top expenses", "Which invoices are overdue?").

### 2. Premium Landing Page
- Modern, dynamic design built with Tailwind CSS.
- High-conversion layout optimized for B2B SaaS.
- Responsive for both desktop and mobile viewing.

### 3. Early Access Waitlist
- Integrated with Firebase Firestore.
- Real-time form validation.
- Secure, write-only data ingestion to capture leads.

---

## 🛠 Tech Stack

**Frontend:**
- **Framework:** React.js + Vite
- **Styling:** Tailwind CSS v3
- **Routing:** React Router v6
- **Data Visualization:** Recharts
- **Icons:** Lucide React

**Backend:**
- **Environment:** Node.js + Express
- **Database:** Firebase Firestore
- **Architecture:** Modular API routes and controllers

---

## 💻 Running Locally

### Prerequisites
Make sure you have Node.js (v18 or higher) installed on your system.

### 1. Setup the Backend
Navigate to the server directory and install dependencies:
\`\`\`bash
cd server
npm install
\`\`\`

Start the backend server (runs on port 5001 by default):
\`\`\`bash
npm run start
# OR
node src/index.js
\`\`\`

### 2. Setup the Frontend
Open a new terminal window, navigate to the client directory, and install dependencies:
\`\`\`bash
cd client
npm install
\`\`\`

Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

### 3. View the App
Open your browser and navigate to \`http://localhost:5173\`.
- View the landing page and try the waitlist form.
- Navigate to the interactive demo via the "Explore Interactive Demo" button to test out the workspace.

---

## 📂 Project Structure

\`\`\`
FINPILOT/
├── client/                     # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components (landing, demo, core)
│   │   ├── pages/              # Main route pages (Landing, Dashboard, etc.)
│   │   ├── App.jsx             # React Router configuration
│   │   └── main.jsx            # React entry point
│   └── tailwind.config.js
├── server/                     # Node.js Express backend
│   ├── src/
│   │   ├── routes/             # API routes (waitlist, demo data)
│   │   ├── seed/               # Mock data for the demo environment
│   │   ├── firebase.js         # Firebase connection config
│   │   └── index.js            # Express server entry point
│   └── .env                    # Environment variables (Ports, API keys)
└── docs/                       # Project documentation
\`\`\`

---

## 📝 License
© 2026 FINPILOT. All rights reserved.
