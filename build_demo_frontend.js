const fs = require('fs');
const path = require('path');

const demoCompPath = '/Users/vijaykota/Documents/FINPILOT/client/src/components/demo';
const demoPagePath = '/Users/vijaykota/Documents/FINPILOT/client/src/pages/demo';
fs.mkdirSync(demoCompPath, { recursive: true });
fs.mkdirSync(demoPagePath, { recursive: true });

const files = {
  [path.join(demoCompPath, 'DemoLayout.jsx')]: `
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, CheckSquare, MessageSquare, ArrowLeft } from 'lucide-react';

export function DemoLayout() {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/demo', end: true, icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Transactions', path: '/demo/transactions', end: false, icon: <ListOrdered className="w-4 h-4" /> },
    { name: 'Reconciliation', path: '/demo/reconciliation', end: false, icon: <CheckSquare className="w-4 h-4" /> },
    { name: 'AI Assistant', path: '/demo/assistant', end: false, icon: <MessageSquare className="w-4 h-4" /> }
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 text-white flex flex-col flex-shrink-0">
        <div className="p-6">
          <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-black shadow-inner">F</div>
            FINPILOT
          </div>
          <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4">Workspace</div>
          <nav className="flex flex-col gap-1">
            {navItems.map(item => (
              <NavLink 
                key={item.name} 
                to={item.path} 
                end={item.end}
                className={({isActive}) => \`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors \${isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-900'}\`}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-900">
           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-white transition-colors">
             <ArrowLeft className="w-3 h-3" /> Back to Website
           </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-50 relative">
        <div className="absolute top-0 right-0 p-4">
          <div className="bg-amber-100/50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm flex items-center gap-1.5">
             <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
             Demo Environment
          </div>
        </div>
        <div className="p-8 max-w-6xl mx-auto h-full">
           <Outlet />
        </div>
      </div>
    </div>
  );
}`,

  [path.join(demoPagePath, 'Dashboard.jsx')]: `
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/demo/dashboard')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div className="flex items-center justify-center h-full text-slate-400">Loading dashboard...</div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Good morning.</h1>
        <p className="text-slate-500 mt-1">Here is your business at a glance.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
           <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Income</div>
           <div className="text-2xl font-bold text-slate-900">₹{data.metrics.totalIncome.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
           <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Expenses</div>
           <div className="text-2xl font-bold text-slate-900">₹{data.metrics.totalExpenses.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
           <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Net Profit</div>
           <div className="text-2xl font-bold text-blue-600">₹{data.metrics.netProfit.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white">
           <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cash Balance</div>
           <div className="text-2xl font-bold">₹{data.metrics.cashBalance.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Cash Flow (Last 6 Months)</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.cashFlow} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => \`₹\${val/1000}k\`} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [\`₹\${value.toLocaleString('en-IN')}\`, '']}
              />
              <Bar dataKey="inflow" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Inflow" />
              <Bar dataKey="outflow" fill="#ef4444" radius={[4, 4, 0, 0]} name="Outflow" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}`,

  [path.join(demoPagePath, 'Transactions.jsx')]: `
import React, { useState, useEffect } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/demo/transactions')
      .then(res => res.json())
      .then(json => setTransactions(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
        <p className="text-slate-500 mt-1">Review your recent synced banking activity.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors text-sm">
                  <td className="p-4 text-slate-600 whitespace-nowrap">{new Date(t.date).toLocaleDateString('en-IN', {month:'short', day:'numeric'})}</td>
                  <td className="p-4 font-medium text-slate-900">{t.description}</td>
                  <td className="p-4 text-slate-500">{t.category}</td>
                  <td className={\`p-4 text-right font-bold \${t.type === 'credit' ? 'text-green-600' : 'text-slate-900'}\`}>
                    {t.type === 'credit' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-center">
                    <span className={\`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase \${t.status === 'reconciled' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}\`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                 <tr><td colSpan="5" className="p-8 text-center text-slate-400">Loading transactions...</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}`,

  [path.join(demoPagePath, 'Reconciliation.jsx')]: `
import React, { useState, useEffect } from 'react';

export default function Reconciliation() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/demo/reconciliation')
      .then(res => res.json())
      .then(json => setItems(json.pendingItems))
      .catch(err => console.error(err));
  }, []);

  const handleApprove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Reconciliation</h1>
        <p className="text-slate-500 mt-1">Review pending matches identified by AI.</p>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 shadow-sm">
             All caught up! No pending matches.
          </div>
        ) : items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-6 items-center">
             
             {/* Bank Side */}
             <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Bank Transaction</div>
               <div className="font-semibold text-slate-900">{item.bankTx.description}</div>
               <div className="text-sm text-slate-500">{new Date(item.bankTx.date).toLocaleDateString('en-IN')}</div>
               <div className="text-xl font-bold text-slate-900 mt-2">₹{item.bankTx.amount.toLocaleString('en-IN')}</div>
             </div>
             
             {/* Match Info */}
             <div className="flex flex-col items-center justify-center text-blue-600">
               <div className="text-[10px] font-bold bg-blue-100 px-2 py-1 rounded-full mb-2">{item.confidence}% MATCH</div>
               <svg className="w-6 h-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
             </div>
             
             {/* Ledger Side */}
             <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
               <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">Ledger Entry</div>
               <div className="font-semibold text-slate-900">{item.ledgerEntry.description}</div>
               <div className="text-sm text-slate-500">Invoice #{item.ledgerEntry.invoiceRef}</div>
               <div className="text-xl font-bold text-slate-900 mt-2">₹{item.ledgerEntry.amount.toLocaleString('en-IN')}</div>
             </div>
             
             {/* Action */}
             <div className="flex flex-col gap-2">
               <button onClick={() => handleApprove(item.id)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                 Approve
               </button>
               <button className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold py-2 px-6 rounded-lg transition-colors">
                 Investigate
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  [path.join(demoPagePath, 'AIAssistant.jsx')]: `
import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am the FinPilot AI Assistant. I can analyze your financial data and answer questions. Try asking: "Show my top expenses this month" or "Which invoices are overdue?"' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/demo/assistant', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: userMsg })
      });
      const data = await res.json();
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        setLoading(false);
      }, 600); // simulated thinking delay
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          AI Assistant <Sparkles className="w-6 h-6 text-blue-500" />
        </h1>
        <p className="text-slate-500 mt-1">Chat directly with your financial data.</p>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((m, i) => (
            <div key={i} className={\`flex \${m.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
               <div className={\`max-w-[70%] p-4 rounded-2xl \${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-sm'}\`}>
                 {m.role === 'assistant' && <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">FinPilot AI</div>}
                 <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
               </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white border border-slate-200 text-slate-400 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
                 <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                 <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your finances..."
              className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:bg-white transition-all"
            />
            <button type="submit" disabled={!input.trim() || loading} className="absolute right-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}`
};

Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(filepath, content);
  console.log('Created:', filepath);
});

// Update App.jsx to use these routes
const appPath = '/Users/vijaykota/Documents/FINPILOT/client/src/App.jsx';
const appContent = `
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import { DemoLayout } from './components/demo/DemoLayout';
import Dashboard from './pages/demo/Dashboard';
import Transactions from './pages/demo/Transactions';
import Reconciliation from './pages/demo/Reconciliation';
import AIAssistant from './pages/demo/AIAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Demo Workspace Routes */}
        <Route path="/demo" element={<DemoLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="reconciliation" element={<Reconciliation />} />
          <Route path="assistant" element={<AIAssistant />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
`;
fs.writeFileSync(appPath, appContent);
console.log('Updated App.jsx');
