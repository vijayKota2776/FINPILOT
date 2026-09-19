const fs = require('fs');
const path = require('path');

const demoCompPath = '/Users/vijaykota/Documents/FINPILOT/client/src/components/demo';
const demoPagePath = '/Users/vijaykota/Documents/FINPILOT/client/src/pages/demo';
fs.mkdirSync(demoCompPath, { recursive: true });
fs.mkdirSync(demoPagePath, { recursive: true });

const files = {
  [path.join(demoCompPath, 'DemoLayout.jsx')]: `
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Link2, Cpu, CheckSquare, LayoutDashboard, MessageSquare, ArrowLeft } from 'lucide-react';

export function DemoLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const steps = [
    { name: 'Connect', path: '/demo/connect', icon: <Link2 className="w-5 h-5" />, desc: 'Link bank accounts' },
    { name: 'Process', path: '/demo/process', icon: <Cpu className="w-5 h-5" />, desc: 'AI categorization' },
    { name: 'Review', path: '/demo/review', icon: <CheckSquare className="w-5 h-5" />, desc: 'Reconcile matches' },
    { name: 'Understand', path: '/demo/understand', icon: <LayoutDashboard className="w-5 h-5" />, desc: 'View insights' },
    { name: 'Act', path: '/demo/act', icon: <MessageSquare className="w-5 h-5" />, desc: 'Query AI Assistant' }
  ];

  const currentStepIndex = steps.findIndex(s => location.pathname === s.path);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar Stepper */}
      <div className="w-full md:w-80 bg-slate-950 text-white flex flex-col flex-shrink-0 relative overflow-hidden z-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="p-8 pb-4">
          <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-black shadow-inner">F</div>
            FINPILOT
          </div>
          <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-6">Product Tour</div>
          
          <div className="flex flex-col gap-8 relative">
            {/* Connecting line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-800 z-0 hidden md:block"></div>
            
            {steps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isPast = index < currentStepIndex;
              return (
                <div key={step.name} className="flex gap-4 relative z-10">
                  <div className={\`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 \${
                    isActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 
                    isPast ? 'bg-slate-800 text-slate-300' : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }\`}>
                    {step.icon}
                  </div>
                  <div className="pt-1">
                    <div className={\`font-bold text-sm \${isActive ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-500'}\`}>{step.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-auto p-8 pt-4">
           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors">
             <ArrowLeft className="w-4 h-4" /> Exit Tour
           </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-50 relative">
        <div className="absolute top-0 right-0 p-6 z-20">
          <div className="bg-amber-100/80 backdrop-blur text-amber-800 border border-amber-200 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
             Interactive Demo
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto h-full flex flex-col pt-12 p-8">
           <div className="flex-1 min-h-0 relative">
             <Outlet />
           </div>
        </div>
      </div>
    </div>
  );
}`,

  [path.join(demoPagePath, 'StepConnect.jsx')]: `
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function StepConnect() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col justify-center max-w-2xl mx-auto py-12">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Link2 className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Step 1: Connect</h1>
        <p className="text-lg text-slate-600 mt-3 max-w-lg mx-auto">FinPilot securely pulls data directly from your bank accounts in real-time, eliminating manual data entry.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 text-center max-w-md mx-auto w-full relative">
        {!connected ? (
          <>
            <div className="flex justify-center mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg" alt="HDFC" className="h-8 opacity-80" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-2">Connect HDFC Current Account</h3>
            <p className="text-sm text-slate-500 mb-8">Secure connection via Open Banking API.</p>
            
            <button 
              onClick={handleConnect}
              disabled={connecting}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-80"
            >
              {connecting ? <><Loader2 className="w-5 h-5 animate-spin" /> Connecting...</> : 'Connect Account'}
            </button>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-green-500" /> Bank-grade encryption
            </div>
          </>
        ) : (
          <div className="animate-in zoom-in-95 duration-500 py-4">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle2 className="w-10 h-10 text-green-600" />
             </div>
             <h3 className="font-bold text-slate-900 text-xl mb-2">Successfully Connected!</h3>
             <p className="text-sm text-slate-500 mb-8">HDFC Bank data is now flowing into FinPilot.</p>
             <button onClick={() => navigate('/demo/process')} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
               Next Step: Process Data <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        )}
      </div>
    </div>
  );
}`,

  [path.join(demoPagePath, 'StepProcess.jsx')]: `
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, ArrowRight, Sparkles } from 'lucide-react';

const rawTransactions = [
  { id: 1, raw: "UPI/AWS/MUMBAI/10293", amount: -4500, time: 500, category: "Software & IT" },
  { id: 2, raw: "NEFT/CLIENT ABC/INV-001", amount: 150000, time: 1500, category: "Revenue" },
  { id: 3, raw: "POS/UBER TRIP/BLR", amount: -850, time: 2500, category: "Travel" },
  { id: 4, raw: "ACH/ZOHO CORP/SUB", amount: -1200, time: 3500, category: "Software & IT" }
];

export default function StepProcess() {
  const navigate = useNavigate();
  const [processedTx, setProcessedTx] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    rawTransactions.forEach(tx => {
      setTimeout(() => {
        setProcessedTx(prev => [...prev, tx]);
      }, tx.time);
    });

    setTimeout(() => {
      setIsDone(true);
    }, 4500);
  }, []);

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col relative pb-24">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Step 2: Process</h1>
          <p className="text-slate-600 mt-1">FinPilot's AI engine instantly cleans and categorizes raw banking data.</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500">
          <div>Raw Bank Feed</div>
          <div>AI Output</div>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto">
          {processedTx.length === 0 && <div className="text-center text-slate-400 py-10 animate-pulse">Waiting for incoming data...</div>}
          
          {processedTx.map(tx => (
            <div key={tx.id} className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 animate-in slide-in-from-left-8 fade-in duration-500">
              <div className="font-mono text-sm text-slate-600 bg-slate-200/50 px-3 py-2 rounded-lg truncate">
                {tx.raw}
              </div>
              
              <div className="flex flex-col items-center justify-center text-blue-500">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <div className="w-8 h-px bg-blue-200 mt-2"></div>
              </div>
              
              <div className="flex justify-between items-center bg-white border border-blue-100 shadow-sm px-4 py-3 rounded-xl">
                 <div className="font-bold text-sm text-slate-800">{tx.category}</div>
                 <div className={\`font-bold \${tx.amount > 0 ? 'text-green-600' : 'text-slate-900'}\`}>₹{Math.abs(tx.amount).toLocaleString('en-IN')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Bar */}
      {isDone && (
        <div className="absolute bottom-0 left-0 w-full p-6 animate-in slide-in-from-bottom-8 duration-500 flex justify-end pointer-events-none">
          <button onClick={() => navigate('/demo/review')} className="pointer-events-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
            Next Step: Review Matches <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}`,

  [path.join(demoPagePath, 'Reconciliation.jsx')]: `
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Reconciliation() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/demo/reconciliation')
      .then(res => res.json())
      .then(json => {
        setItems(json.pendingItems);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleApprove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col relative pb-24">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <CheckSquare className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Step 3: Review</h1>
          <p className="text-slate-600 mt-1">AI identifies matches between bank payments and open invoices. Approve them with one click.</p>
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {loading && <div className="text-center text-slate-400 py-10">Fetching matches...</div>}
        
        {!loading && items.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-green-200 text-center shadow-sm flex flex-col items-center">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
               <CheckCircle2 className="w-10 h-10 text-green-600" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-2">All caught up!</h3>
             <p className="text-slate-500">You've successfully reviewed all AI-proposed matches.</p>
          </div>
        ) : items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-6 items-center animate-in slide-in-from-right-4">
             
             {/* Bank Side */}
             <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Bank Transaction</div>
               <div className="font-semibold text-slate-900">{item.bankTx.description}</div>
               <div className="text-sm text-slate-500">{new Date(item.bankTx.date).toLocaleDateString('en-IN')}</div>
               <div className="text-xl font-bold text-slate-900 mt-2">₹{item.bankTx.amount.toLocaleString('en-IN')}</div>
             </div>
             
             {/* Match Info */}
             <div className="flex flex-col items-center justify-center text-blue-600">
               <div className="text-[10px] font-bold bg-blue-100 px-3 py-1 rounded-full mb-2">{item.confidence}% MATCH</div>
               <ArrowRight className="w-6 h-6 text-slate-300" />
             </div>
             
             {/* Ledger Side */}
             <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-100">
               <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">Found In Ledger</div>
               <div className="font-semibold text-slate-900">{item.ledgerEntry.description}</div>
               <div className="text-sm text-slate-500">Ref: {item.ledgerEntry.invoiceRef}</div>
               <div className="text-xl font-bold text-slate-900 mt-2">₹{item.ledgerEntry.amount.toLocaleString('en-IN')}</div>
             </div>
             
             {/* Action */}
             <div className="flex flex-col gap-2">
               <button onClick={() => handleApprove(item.id)} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95">
                 Approve
               </button>
             </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Bar */}
      {!loading && items.length === 0 && (
        <div className="absolute bottom-0 left-0 w-full p-6 animate-in slide-in-from-bottom-4 duration-500 flex justify-end pointer-events-none">
          <button onClick={() => navigate('/demo/understand')} className="pointer-events-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
            Next Step: View Insights <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}`,

  [path.join(demoPagePath, 'Dashboard.jsx')]: `
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/demo/dashboard')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div className="flex items-center justify-center h-full text-slate-400">Loading dashboard...</div>;

  return (
    <div className="animate-in fade-in duration-500 relative pb-24 h-full flex flex-col">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <LayoutDashboard className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Step 4: Understand</h1>
          <p className="text-slate-600 mt-1">With data processed and reconciled, you get real-time visibility into business health.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
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
             <div className="text-2xl font-bold text-green-600">₹{data.metrics.netProfit.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl text-white">
             <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cash Balance</div>
             <div className="text-2xl font-bold">₹{data.metrics.cashBalance.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Cash Flow (Last 6 Months)</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.cashFlow} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => \`₹\${val/1000}k\`} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [\`₹\${value.toLocaleString('en-IN')}\`, '']}
                />
                <Bar dataKey="inflow" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Inflow" />
                <Bar dataKey="outflow" fill="#ef4444" radius={[6, 6, 0, 0]} name="Outflow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full p-6 animate-in slide-in-from-bottom-4 duration-500 flex justify-end pointer-events-none">
        <button onClick={() => navigate('/demo/act')} className="pointer-events-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
          Final Step: Query AI <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}`,

  [path.join(demoPagePath, 'AIAssistant.jsx')]: `
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles } from 'lucide-react';

export default function AIAssistant() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'You can now ask questions about your live data. Try asking: "Show my top expenses this month" or "Which invoices are overdue?"' }
  ]);
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!input.trim()) return;

    setHasInteracted(true);
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
      }, 800);
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col relative pb-24">
      <div className="mb-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Step 5: Act</h1>
          <p className="text-slate-600 mt-1">Instead of building reports manually, just ask the FinPilot AI.</p>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-3xl shadow-lg flex flex-col overflow-hidden relative">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((m, i) => (
            <div key={i} className={\`flex \${m.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
               <div className={\`max-w-[70%] p-5 rounded-2xl shadow-sm \${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'}\`}>
                 {m.role === 'assistant' && <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-1"><Sparkles className="w-3 h-3"/> FinPilot AI</div>}
                 <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">{m.content}</div>
               </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white border border-slate-200 p-5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[60px]">
                 <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                 <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
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
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-inner"
            />
            <button type="submit" disabled={!input.trim() || loading} className="absolute right-3 p-2.5 bg-blue-600 text-white rounded-lg transition-all hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Final CTA */}
      {hasInteracted && (
        <div className="absolute bottom-0 left-0 w-full p-6 animate-in slide-in-from-bottom-4 duration-500 flex justify-end pointer-events-none">
          <button onClick={() => navigate('/')} className="pointer-events-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-xl shadow-green-600/20 transition-all flex items-center justify-center gap-2 group">
            End of Demo. Join Waitlist <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}`
};

Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(filepath, content);
  console.log('Created/Updated:', filepath);
});

// Update App.jsx to map new routes
const appPath = '/Users/vijaykota/Documents/FINPILOT/client/src/App.jsx';
const appContent = `
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import { DemoLayout } from './components/demo/DemoLayout';
import DemoLoading from './pages/demo/DemoLoading';
import StepConnect from './pages/demo/StepConnect';
import StepProcess from './pages/demo/StepProcess';
import Reconciliation from './pages/demo/Reconciliation';
import Dashboard from './pages/demo/Dashboard';
import AIAssistant from './pages/demo/AIAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Loading Transition Route */}
        <Route path="/demo/loading" element={<DemoLoading />} />
        
        {/* Guided Demo Workspace Routes */}
        <Route path="/demo" element={<DemoLayout />}>
          <Route path="connect" element={<StepConnect />} />
          <Route path="process" element={<StepProcess />} />
          <Route path="review" element={<Reconciliation />} />
          <Route path="understand" element={<Dashboard />} />
          <Route path="act" element={<AIAssistant />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
`;
fs.writeFileSync(appPath, appContent);
console.log('Updated App.jsx with guided routes');
