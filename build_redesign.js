const fs = require('fs');
const path = require('path');

const basePath = '/Users/vijaykota/Documents/FINPILOT/client/src/components/landing';
fs.mkdirSync(basePath, { recursive: true });

const files = {
  'Navbar.jsx': `
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar({ onWaitlistClick }) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={\`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent \${isScrolled ? 'bg-white/80 backdrop-blur-lg border-slate-200/60 shadow-sm py-4' : 'bg-transparent py-6'}\`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold tracking-tight text-slate-950 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-black shadow-inner">F</div>
            FINPILOT
          </div>
          <div className="hidden md:flex gap-6 items-center text-sm font-medium text-slate-600">
            <a href="#product" className="hover:text-slate-900 transition-colors">Product</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#security" className="hover:text-slate-900 transition-colors">Security</a>
          </div>
        </div>
        
        <div className="hidden md:flex gap-4 items-center">
          <button className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">Log in</button>
          <button onClick={onWaitlistClick} className="text-sm font-medium bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full shadow-sm transition-all hover:shadow">
            Join Waitlist
          </button>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t py-4 px-6 flex flex-col gap-4">
          <a href="#product" className="text-slate-600 font-medium py-2">Product</a>
          <a href="#how-it-works" className="text-slate-600 font-medium py-2">How It Works</a>
          <a href="#features" className="text-slate-600 font-medium py-2">Features</a>
          <button onClick={() => navigate('/demo')} className="w-full text-center text-sm font-medium border border-slate-200 py-3 rounded-lg text-slate-900">Explore Demo</button>
          <button onClick={onWaitlistClick} className="w-full text-center text-sm font-medium bg-slate-950 text-white py-3 rounded-lg">Join Waitlist</button>
        </div>
      )}
    </nav>
  );
}`,

  'Hero.jsx': `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity, FileText, CheckCircle2 } from 'lucide-react';

export function Hero({ onWaitlistClick }) {
  const navigate = useNavigate();

  return (
    <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden bg-slate-50">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex-1 text-left lg:max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold tracking-wide mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            FINPILOT FOR BUSINESS
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-950 mb-6 leading-[1.05]">
            Intelligent finance <br />
            <span className="text-slate-500">for modern teams.</span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
            Connect your financial data, automate repetitive accounting work, and get deep insights into your business performance—all in one workspace.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate('/demo')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5">
              Explore Interactive Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onWaitlistClick} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl shadow-sm transition-all">
              Join Early Access
            </button>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500">
             <div className="flex -space-x-2">
                {[1,2,3,4].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-50 bg-slate-200"></div>)}
             </div>
             <span>Built for founders, CFOs, and finance teams.</span>
          </div>
        </div>
        
        {/* Right UI Mockup */}
        <div className="flex-1 lg:w-[800px] lg:flex-none relative">
          {/* Decorative frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-white rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
          
          {/* Main App Window */}
          <div className="relative bg-white border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
            {/* Header */}
            <div className="h-12 bg-slate-50/80 backdrop-blur border-b border-slate-100 flex items-center justify-between px-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              </div>
              <div className="text-[10px] font-bold tracking-widest text-slate-400">FINPILOT WORKSPACE</div>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">R</div>
            </div>
            
            {/* App Body */}
            <div className="flex-1 flex bg-slate-50/50">
              {/* Sidebar */}
              <div className="w-16 border-r border-slate-100 bg-white flex flex-col items-center py-4 gap-6">
                <Activity className="w-5 h-5 text-blue-600" />
                <FileText className="w-5 h-5 text-slate-300" />
                <CheckCircle2 className="w-5 h-5 text-slate-300" />
              </div>
              
              {/* Main Content */}
              <div className="flex-1 p-6 overflow-hidden flex flex-col gap-6">
                 {/* Top Metrics */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {[
                     { label: 'Cash Balance', val: '₹6,78,240', pos: true },
                     { label: 'Revenue (MTD)', val: '₹12,45,000', pos: true },
                     { label: 'Expenses (MTD)', val: '₹8,32,000', pos: false },
                     { label: 'Net Flow', val: '+₹4,13,000', pos: true }
                   ].map((m, i) => (
                     <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                       <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1">{m.label}</div>
                       <div className="text-lg font-bold text-slate-800">{m.val}</div>
                     </div>
                   ))}
                 </div>

                 <div className="flex gap-4 h-full min-h-0">
                    {/* Chart Area */}
                    <div className="flex-[2] bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-xs font-semibold text-slate-800">Cash Flow Trend</div>
                        <div className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600">Last 30 Days</div>
                      </div>
                      <div className="flex-1 flex items-end gap-2 pb-2">
                        {[40, 55, 45, 60, 80, 65, 90, 75, 85].map((h, i) => (
                          <div key={i} className="flex-1 bg-blue-100 rounded-t-sm relative group">
                             <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all" style={{height: \`\${h}%\`}}></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Insights Area */}
                    <div className="flex-1 flex flex-col gap-3">
                       <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 shadow-sm">
                         <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wide mb-1">Action Required</div>
                         <div className="text-sm font-medium text-amber-900">3 transactions need review</div>
                         <div className="mt-2 text-xs bg-white text-slate-700 px-2 py-1 rounded shadow-sm border border-slate-100 w-max">Review now →</div>
                       </div>
                       
                       <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 shadow-sm flex-1">
                         <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wide mb-1">AI Insight</div>
                         <div className="text-sm font-medium text-blue-900 leading-tight">Software expenses increased 14% vs last month.</div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'FinancialMoment.jsx': `
import React from 'react';
import { ArrowDown, Building2, FileSpreadsheet, CreditCard, Landmark, Mail } from 'lucide-react';

export function FinancialMoment() {
  return (
    <section className="py-32 px-6 bg-white border-y border-slate-100 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Your finance team shouldn't have to hunt for the answer.</h2>
        <p className="text-lg text-slate-500 mb-20 max-w-2xl mx-auto">
          Financial data is scattered across banks, accounting software, spreadsheets, and emails. We bring it all together.
        </p>

        {/* Visual Flow */}
        <div className="flex flex-col items-center">
          
          {/* Fragmented Top Layer */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 relative z-10 w-full max-w-2xl">
            {[
              { label: "Banks", icon: <Landmark className="w-4 h-4" /> },
              { label: "Tally", icon: <Building2 className="w-4 h-4" /> },
              { label: "Excel", icon: <FileSpreadsheet className="w-4 h-4" /> },
              { label: "Payment Gateways", icon: <CreditCard className="w-4 h-4" /> },
              { label: "Emails", icon: <Mail className="w-4 h-4" /> }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm text-sm font-semibold text-slate-700">
                <span className="text-slate-400">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
          
          {/* Flow Lines */}
          <div className="h-16 w-px bg-gradient-to-b from-slate-300 to-blue-500 mb-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-full p-1 shadow-sm text-slate-400">
               <ArrowDown className="w-4 h-4" />
            </div>
          </div>
          
          {/* Unified Bottom Layer */}
          <div className="w-full max-w-md bg-slate-950 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500/10 blur-2xl"></div>
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg shadow-blue-500/30">F</div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">One intelligent workspace.</h3>
                <p className="text-sm text-slate-400">Automated synchronization, reconciliation, and reporting.</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}`,

  'ProductWalkthrough.jsx': `
import React, { useState } from 'react';
import { Search, Check, RefreshCw, MessageSquare } from 'lucide-react';

export function ProductWalkthrough() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'understand', num: '01', title: 'Understand', desc: 'See your complete financial picture.' },
    { id: 'reconcile', num: '02', title: 'Reconcile', desc: 'Let AI match transactions instantly.' },
    { id: 'ask', num: '03', title: 'Ask', desc: 'Query your data in plain English.' },
    { id: 'act', num: '04', title: 'Act', desc: 'Review and approve with confidence.' }
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-16 tracking-tight text-center">See FinPilot in action.</h2>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Tabs */}
          <div className="flex-1 flex flex-col gap-2">
            {tabs.map((tab, i) => (
              <button 
                key={i} 
                onClick={() => setActiveTab(i)}
                className={\`text-left p-6 rounded-2xl transition-all \${activeTab === i ? 'bg-white shadow-xl shadow-slate-200/50 border border-slate-200/60' : 'hover:bg-slate-100 border border-transparent'}\`}
              >
                <div className="flex items-start gap-4">
                   <div className={\`text-sm font-bold mt-1 \${activeTab === i ? 'text-blue-600' : 'text-slate-400'}\`}>{tab.num}</div>
                   <div>
                     <h3 className={\`text-xl font-bold mb-2 \${activeTab === i ? 'text-slate-900' : 'text-slate-600'}\`}>{tab.title}</h3>
                     <p className={\`text-sm \${activeTab === i ? 'text-slate-600' : 'text-slate-400'}\`}>{tab.desc}</p>
                   </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Display Area */}
          <div className="flex-[1.5] bg-white border border-slate-200 rounded-3xl p-2 shadow-2xl flex items-center justify-center min-h-[400px]">
             <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-center overflow-hidden relative">
               
               {activeTab === 0 && (
                 <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                   <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Financial Overview</div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><div className="text-xs text-slate-500 mb-1">Revenue</div><div className="text-xl font-bold">₹12.45L</div></div>
                     <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><div className="text-xs text-slate-500 mb-1">Expenses</div><div className="text-xl font-bold text-red-600">₹8.32L</div></div>
                   </div>
                   <div className="h-32 bg-white rounded-xl border border-slate-200 p-4 mt-2">
                     <div className="text-xs text-slate-500 mb-4">Cash Flow (30d)</div>
                     <div className="flex items-end gap-2 h-16 opacity-70">
                       {[10,30,20,50,40,60,50,80].map((h,i) => <div key={i} className="flex-1 bg-blue-200 rounded-t-sm" style={{height:\`\${h}%\`}}></div>)}
                     </div>
                   </div>
                 </div>
               )}

               {activeTab === 1 && (
                 <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-sm mx-auto w-full">
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 relative">
                      <div className="text-xs text-slate-400 mb-1">Bank Transaction</div>
                      <div className="font-semibold text-slate-800">AWS Services India</div>
                      <div className="font-bold text-slate-900">₹12,450</div>
                      <div className="absolute top-4 right-4 text-slate-300"><RefreshCw className="w-4 h-4" /></div>
                    </div>
                    <div className="flex justify-center my-2 text-blue-500"><Search className="w-5 h-5 animate-pulse" /></div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm relative">
                      <div className="absolute top-3 right-3 bg-blue-200 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-full">94% MATCH</div>
                      <div className="text-xs text-blue-500 mb-1">Ledger Entry Found</div>
                      <div className="font-semibold text-slate-800">Software & Cloud</div>
                      <div className="text-sm text-slate-600 mt-2 border-t border-blue-100 pt-2 flex items-center justify-between">
                         <span>Approve Match?</span>
                         <button className="bg-blue-600 text-white p-1 rounded"><Check className="w-4 h-4" /></button>
                      </div>
                    </div>
                 </div>
               )}
               
               {activeTab === 2 && (
                 <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full max-w-md mx-auto space-y-4">
                    <div className="bg-slate-200 text-slate-800 p-3 rounded-2xl rounded-tr-none text-sm self-end ml-auto w-max">
                      Why did cash decrease this month?
                    </div>
                    <div className="bg-white border border-slate-200 text-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm">
                      <p className="text-sm mb-3">Cash decreased by <strong>₹1.82L</strong> compared with last month. The primary drivers were:</p>
                      <ul className="text-sm space-y-2 mb-3">
                        <li className="flex justify-between border-b border-slate-100 pb-1"><span>Supplier payments</span> <span className="text-red-600 font-medium">+₹1.05L</span></li>
                        <li className="flex justify-between border-b border-slate-100 pb-1"><span>Payroll</span> <span className="text-red-600 font-medium">+₹48K</span></li>
                      </ul>
                      <div className="text-xs text-slate-500 flex items-center gap-1"><MessageSquare className="w-3 h-3"/> Based on 1,284 transactions</div>
                    </div>
                 </div>
               )}

               {activeTab === 3 && (
                 <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Pending Approvals (2)</div>
                    {[
                      { v: "Vendor Payment: OfficeMart", a: "₹18,400", d: "Due in 2 days" },
                      { v: "Expense: Team Lunch", a: "₹4,200", d: "Submitted by Rahul" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex justify-between items-center mb-3">
                         <div>
                           <div className="font-semibold text-slate-800 text-sm">{item.v}</div>
                           <div className="text-xs text-slate-500 mt-1">{item.d}</div>
                         </div>
                         <div className="text-right">
                           <div className="font-bold text-slate-900">{item.a}</div>
                           <div className="flex gap-2 mt-2">
                             <button className="text-[10px] uppercase font-bold text-slate-500 hover:text-red-500">Reject</button>
                             <button className="text-[10px] uppercase font-bold bg-slate-900 text-white px-2 py-1 rounded">Approve</button>
                           </div>
                         </div>
                      </div>
                    ))}
                 </div>
               )}

             </div>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'FeatureBento.jsx': `
import React from 'react';

export function FeatureBento() {
  return (
    <section id="features" className="py-32 px-6 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-bold mb-16 tracking-tight text-center">Built for serious business finance.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Large Block */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full"></div>
             <h3 className="text-2xl font-bold mb-2">Financial Command Center</h3>
             <p className="text-slate-400 mb-8 max-w-sm">See the complete financial picture without switching between spreadsheets, portals and tools.</p>
             
             {/* Mini UI */}
             <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-2xl transform transition-transform group-hover:-translate-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-3">
                  <div className="text-sm font-semibold">Cash Overview</div>
                  <div className="text-xs text-green-400 font-mono">+12.4%</div>
                </div>
                <div className="flex items-end gap-1 h-20 opacity-80">
                  {[3,5,4,7,6,8,5,9,10,8,12,11].map((h,i) => <div key={i} className="flex-1 bg-slate-700 hover:bg-blue-500 transition-colors rounded-t-sm" style={{height:\`\${h*8}%\`}}></div>)}
                </div>
             </div>
          </div>

          {/* Medium Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between group">
             <div>
               <h3 className="text-xl font-bold mb-2">AI Reconciliation</h3>
               <p className="text-sm text-slate-400 mb-6">Match thousands of transactions in seconds with high confidence.</p>
             </div>
             <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
               <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                 <span>Confidence</span>
                 <span className="text-blue-400 font-bold">98%</span>
               </div>
               <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-blue-500 h-full w-[98%]"></div>
               </div>
             </div>
          </div>

          {/* Medium Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 group">
             <h3 className="text-xl font-bold mb-2">Invoices & Bills</h3>
             <p className="text-sm text-slate-400 mb-6">Track receivables and payables in one place automatically.</p>
             <div className="space-y-2">
               <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                 <span className="text-xs font-medium">Overdue (2)</span>
                 <span className="text-xs text-red-400 font-mono">₹42,000</span>
               </div>
               <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                 <span className="text-xs font-medium">Pending AP</span>
                 <span className="text-xs text-slate-300 font-mono">₹1,12,000</span>
               </div>
             </div>
          </div>

          {/* Large Block */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-hidden relative">
             <h3 className="text-2xl font-bold mb-2">AI Finance Assistant</h3>
             <p className="text-slate-400 mb-8 max-w-sm">Query your financial data naturally and get instant answers grounded in your workspace.</p>
             
             <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-2xl flex flex-col gap-3">
                <div className="self-end bg-blue-600/20 text-blue-200 border border-blue-500/30 px-3 py-2 rounded-lg text-xs max-w-[80%]">Show open invoices</div>
                <div className="self-start bg-slate-800 text-slate-300 px-3 py-2 rounded-lg text-xs max-w-[80%]">You have 4 open invoices totaling ₹2.14L. The largest is ABC Corp for ₹1.2L.</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}`,

  'SecuritySection.jsx': `
import React from 'react';
import { Lock, UserCheck, Database, History } from 'lucide-react';

export function SecuritySection() {
  return (
    <section id="security" className="py-32 px-6 bg-slate-950 border-t border-slate-900 text-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold tracking-widest uppercase mb-8">
          Enterprise Grade
        </div>
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-16 tracking-tight">Built on a secure foundation.</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { icon: <Lock className="w-5 h-5"/>, title: "Secure Data", desc: "Workspace-level isolation." },
             { icon: <UserCheck className="w-5 h-5"/>, title: "Access Control", desc: "Role-based permissions." },
             { icon: <History className="w-5 h-5"/>, title: "Audit Trails", desc: "Every action logged." },
             { icon: <Database className="w-5 h-5"/>, title: "Read-only", desc: "No unwanted write access." }
           ].map((s,i) => (
             <div key={i} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl text-left">
               <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400 mb-4">{s.icon}</div>
               <h3 className="text-white font-semibold mb-2">{s.title}</h3>
               <p className="text-slate-400 text-sm">{s.desc}</p>
             </div>
           ))}
        </div>
        <p className="text-xs text-slate-600 mt-16 max-w-lg mx-auto">
          FinPilot is currently in development. Demo environments use simulated financial data and make no compliance claims. No banking passwords collected.
        </p>
      </div>
    </section>
  );
}`,

  'CTASection.jsx': `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CTASection({ onWaitlistClick }) {
  const navigate = useNavigate();
  return (
    <section className="py-32 px-6 bg-blue-600 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-700/50 mix-blend-overlay"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          See your finances <br/> in one place.
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">
          Explore the FINPILOT interactive workspace using simulated business data. No setup required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={() => navigate('/demo')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform">
            Explore Interactive Demo <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={onWaitlistClick} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white font-medium rounded-xl hover:bg-blue-800 transition-colors">
            Join Early Access
          </button>
        </div>
        <p className="mt-8 text-sm text-blue-200 font-medium">* Demo uses simulated financial data.</p>
      </div>
    </section>
  );
}`,

  'FAQ.jsx': `
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const faqs = [
    { q: "What exactly does FINPILOT do?", a: "FINPILOT is an intelligent financial workspace that brings together bank data, accounting records, and invoices to automate reconciliation and provide real-time business insights." },
    { q: "Does FINPILOT connect to my bank?", a: "The current public demo uses simulated data. Real integrations will be introduced progressively in the production version." },
    { q: "Who is FINPILOT built for?", a: "It's built for founders, CFOs, and finance teams at Indian SMBs who want to move away from fragmented spreadsheets." },
    { q: "Is FINPILOT currently available?", a: "We are currently in early access. You can join the waitlist to be notified when we open to new businesses." }
  ];

  const [open, setOpen] = useState(0);

  return (
    <section className="py-32 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none" 
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span className="font-semibold text-slate-900">{faq.q}</span>
                <ChevronDown className={\`w-5 h-5 text-slate-400 transition-transform duration-300 \${open === i ? 'rotate-180' : ''}\`} />
              </button>
              <div 
                className={\`px-6 overflow-hidden transition-all duration-300 ease-in-out \${open === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}\`}
              >
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'Footer.jsx': `
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="text-xl font-bold tracking-tight text-slate-950 flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-black">F</div>
            FINPILOT
          </div>
          <p className="text-sm text-slate-500 font-medium max-w-xs">Intelligent finance for modern teams.</p>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 mb-6 text-sm tracking-wider uppercase">Product</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-500">
            <li><a href="#features" className="hover:text-slate-900 transition-colors">Features</a></li>
            <li><a href="/demo" className="hover:text-slate-900 transition-colors">Interactive Demo</a></li>
            <li><a href="#how-it-works" className="hover:text-slate-900 transition-colors">Workflow</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 mb-6 text-sm tracking-wider uppercase">Company</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-500">
            <li><a href="#" className="hover:text-slate-900 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Early Access</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 mb-6 text-sm tracking-wider uppercase">Legal</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-500">
            <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
        <div>© 2026 FinPilot. All rights reserved.</div>
        <div>FinPilot is in development. Demo data is simulated.</div>
      </div>
    </footer>
  );
}`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(basePath, filepath);
  fs.writeFileSync(fullPath, content);
  console.log('Created:', filepath);
});

// Update Landing.jsx
const landingPath = '/Users/vijaykota/Documents/FINPILOT/client/src/pages/Landing.jsx';
const landingContent = `
import React, { useState } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { FinancialMoment } from '../components/landing/FinancialMoment';
import { ProductWalkthrough } from '../components/landing/ProductWalkthrough';
import { FeatureBento } from '../components/landing/FeatureBento';
import { SecuritySection } from '../components/landing/SecuritySection';
import { CTASection } from '../components/landing/CTASection';
import { FAQ } from '../components/landing/FAQ';
import { Footer } from '../components/landing/Footer';
import { WaitlistModal } from '../components/landing/WaitlistModal';

export default function Landing() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth selection:bg-blue-200">
      <Navbar onWaitlistClick={() => setWaitlistOpen(true)} />
      <Hero onWaitlistClick={() => setWaitlistOpen(true)} />
      <FinancialMoment />
      <ProductWalkthrough />
      <FeatureBento />
      <SecuritySection />
      <CTASection onWaitlistClick={() => setWaitlistOpen(true)} />
      <FAQ />
      <Footer />
      
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
`;
fs.writeFileSync(landingPath, landingContent);
console.log('Updated Landing.jsx');
