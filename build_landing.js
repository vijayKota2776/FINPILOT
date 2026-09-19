const fs = require('fs');
const path = require('path');

const basePath = '/Users/vijaykota/Documents/FINPILOT/client/src/components/landing';
fs.mkdirSync(basePath, { recursive: true });

const files = {
  'Navbar.jsx': `
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

export function Navbar({ onWaitlistClick }) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={\`fixed top-0 w-full z-50 transition-all duration-300 \${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}\`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-950 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg">F</div>
          FINPILOT
        </div>
        
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-600">
          <a href="#product" className="hover:text-blue-600 transition-colors">Product</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
        </div>
        
        <div className="hidden md:flex gap-4 items-center">
          <Button variant="ghost" className="text-slate-600 hover:text-blue-950 font-medium">Log in</Button>
          <Button onClick={onWaitlistClick} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200">Join Waitlist</Button>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t py-4 px-6 flex flex-col gap-4">
          <a href="#product" className="text-slate-600 font-medium py-2">Product</a>
          <a href="#how-it-works" className="text-slate-600 font-medium py-2">How It Works</a>
          <a href="#features" className="text-slate-600 font-medium py-2">Features</a>
          <Button onClick={() => navigate('/demo')} variant="outline" className="w-full justify-center">Explore Demo</Button>
          <Button onClick={onWaitlistClick} className="w-full justify-center bg-blue-600 text-white">Join Waitlist</Button>
        </div>
      )}
    </nav>
  );
}`,

  'Hero.jsx': `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero({ onWaitlistClick }) {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-8">
        <Sparkles className="w-3.5 h-3.5" />
        AI-Powered Finance for Indian SMBs
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-blue-950 mb-6 leading-[1.1]">
        Your business finances.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">One intelligent workspace.</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
        FinPilot helps founders and finance teams bring transactions, invoices, bills, reconciliation and financial insights together in one place.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200" onClick={() => navigate('/demo')}>
          Explore Interactive Demo <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-300 text-slate-700 hover:bg-slate-50" onClick={onWaitlistClick}>
          Join Early Access
        </Button>
      </div>
      
      <p className="mt-6 text-sm text-slate-500 font-medium">No real bank connection required for the demo.</p>

      {/* Dashboard Preview */}
      <div className="mt-20 relative mx-auto max-w-5xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur opacity-50"></div>
        <div className="relative rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="h-12 bg-slate-50 border-b flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            </div>
            <div className="mx-auto bg-white px-3 py-1 rounded text-xs text-slate-500 border shadow-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              DEMO DATA
            </div>
          </div>
          {/* Content */}
          <div className="p-6 bg-slate-100/50 flex flex-col md:flex-row gap-6 text-left">
             <div className="w-48 hidden md:block space-y-2">
               <div className="h-8 bg-blue-100 rounded w-full mb-6"></div>
               <div className="h-4 bg-slate-200 rounded w-3/4"></div>
               <div className="h-4 bg-slate-200 rounded w-5/6"></div>
               <div className="h-4 bg-slate-200 rounded w-2/3"></div>
               <div className="h-4 bg-slate-200 rounded w-full mt-4"></div>
             </div>
             <div className="flex-1">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                 {[{l:'Total Income',v:'₹12,45,000'},{l:'Total Expenses',v:'₹8,32,000'},{l:'Net Profit',v:'₹4,13,000'},{l:'Cash Balance',v:'₹6,78,240'}].map(m=>(
                   <div key={m.l} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                     <div className="text-xs text-slate-500 font-medium mb-1">{m.l}</div>
                     <div className="text-lg font-bold text-slate-800">{m.v}</div>
                   </div>
                 ))}
               </div>
               <div className="h-48 bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col justify-between">
                  <div className="text-sm font-semibold text-slate-700">Cash Flow Overview</div>
                  <div className="flex items-end h-32 gap-2 mt-4">
                     {[40,60,45,80,55,90,75].map((h,i)=>(
                       <div key={i} className="flex-1 bg-blue-100 rounded-t-sm" style={{height: \`\${h}%\`}}></div>
                     ))}
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'ValueStrip.jsx': `
import React from 'react';
import { Clock, ShieldCheck, Eye, Key } from 'lucide-react';

export function ValueStrip() {
  const values = [
    { icon: <Clock className="w-6 h-6 text-blue-600" />, title: 'Save Time', desc: 'Automate repetitive finance work.' },
    { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: 'Reduce Errors', desc: 'AI-assisted reconciliation and review.' },
    { icon: <Eye className="w-6 h-6 text-blue-600" />, title: 'See Clearly', desc: 'Understand cash flow and performance.' },
    { icon: <Key className="w-6 h-6 text-blue-600" />, title: 'Stay in Control', desc: 'Human approval for important decisions.' },
  ];

  return (
    <section className="border-y bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((v, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">{v.icon}</div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">{v.title}</h3>
              <p className="text-sm text-slate-600">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}`,

  'ProblemSection.jsx': `
import React from 'react';

export function ProblemSection() {
  return (
    <section className="py-24 px-6 bg-slate-50 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-12">Your financial data shouldn't live everywhere.</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
           <div className="flex flex-wrap justify-center gap-4 max-w-sm">
             {['Bank Accounts', 'Tally', 'Excel', 'Invoices', 'Payment Platforms'].map(t => (
               <div key={t} className="bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-700 w-36">
                 {t}
               </div>
             ))}
           </div>
           
           <div className="text-slate-300 hidden md:block">
             <svg width="40" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
           </div>
           
           <div className="bg-blue-950 text-white p-8 rounded-2xl shadow-xl border border-blue-800 w-64 h-64 flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-600 opacity-20 blur-2xl rounded-full scale-150 transform -translate-y-1/2"></div>
             <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 relative z-10">F</div>
             <h3 className="text-xl font-bold relative z-10">FINPILOT</h3>
             <p className="text-blue-200 text-sm mt-2 relative z-10">Intelligent Workspace</p>
           </div>
        </div>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          FinPilot brings fragmented financial information into one intelligent workspace so your team spends less time moving data and more time making decisions.
        </p>
        <p className="text-xs text-slate-400 mt-6">* Connectors coming progressively.</p>
      </div>
    </section>
  );
}`,

  'WorkflowSection.jsx': `
import React from 'react';

export function WorkflowSection() {
  const steps = [
    { title: "CONNECT", desc: "Connect your financial data, upload statements, or bring in accounting documents." },
    { title: "PROCESS", desc: "FinPilot organizes transactions, invoices and financial records automatically." },
    { title: "REVIEW", desc: "AI identifies matches, categories and exceptions for your team to review." },
    { title: "UNDERSTAND", desc: "See cash flow, expenses, receivables, payables and financial trends." },
    { title: "ACT", desc: "Turn financial information into clearer, faster business decisions." }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">From financial data to better decisions</h2>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between relative">
          <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-blue-100"></div>
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center max-w-[200px] mx-auto mb-10 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 font-bold mb-6 text-lg">
                {i + 1}
              </div>
              <h3 className="font-bold text-slate-900 mb-3 tracking-wide">{step.title}</h3>
              <p className="text-sm text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'ProductShowcase.jsx': `
import React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export function ProductShowcase() {
  const navigate = useNavigate();
  return (
    <section id="product" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-950 mb-20">Finance work, without the finance chaos.</h2>
        
        <div className="space-y-24">
          {/* Block 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 lg:pr-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">AI-Powered Reconciliation</h3>
              <p className="text-lg text-slate-600 mb-8">
                FinPilot helps your team identify matches, duplicates and exceptions without manually checking every transaction.
              </p>
              <Button onClick={() => navigate('/demo')} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">See Reconciliation</Button>
            </div>
            <div className="flex-1 w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
               <div className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide border-b pb-2">Bank Transaction</div>
               <div className="flex justify-between items-center mb-6">
                 <div className="font-medium">ABC Suppliers</div>
                 <div className="font-bold text-slate-800">₹4,21,000</div>
               </div>
               <div className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide border-b pb-2">Possible Ledger Match</div>
               <div className="flex justify-between items-center mb-6">
                 <div className="font-medium">ABC Suppliers</div>
                 <div className="font-bold text-slate-800">₹4,12,000</div>
               </div>
               <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl mb-6">
                 <div className="flex justify-between items-center mb-2">
                   <div className="text-yellow-800 font-semibold text-sm">Potential match found</div>
                   <div className="text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full font-bold">78% Confidence</div>
                 </div>
                 <p className="text-sm text-yellow-700">The ledger amount differs by ₹9,000.</p>
               </div>
               <div className="flex gap-3">
                 <Button className="flex-1 bg-blue-600">Review</Button>
                 <Button className="flex-1" variant="outline">Investigate</Button>
               </div>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1 lg:pl-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Finance Assistant</h3>
              <p className="text-lg text-slate-600 mb-8">
                Ask questions about your business and get answers grounded in your financial data.
              </p>
              <Button onClick={() => navigate('/demo')} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">Try the AI Demo</Button>
            </div>
            <div className="flex-1 w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
               <div className="flex flex-col gap-4">
                 <div className="self-end bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
                   Show my top 5 expenses this month.
                 </div>
                 <div className="self-start bg-slate-100 text-slate-800 p-4 rounded-2xl rounded-tl-none text-sm max-w-[90%]">
                   <p className="mb-3">Here are your top 5 expenses:</p>
                   <ol className="list-decimal pl-4 space-y-1 font-medium">
                     <li>Raw Materials — ₹2,45,000</li>
                     <li>Salaries — ₹1,80,000</li>
                     <li>Rent — ₹75,000</li>
                     <li>Marketing — ₹42,000</li>
                     <li>Utilities — ₹28,000</li>
                   </ol>
                   <p className="mt-3 text-xs text-slate-400 italic">Based on demo workspace data.</p>
                 </div>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}`,

  'FeaturesSection.jsx': `
import React from 'react';
import { ArrowRight, LayoutDashboard, FileText, PieChart, MessageSquare, Shield, CheckSquare } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    { icon: <LayoutDashboard className="w-6 h-6 text-blue-600" />, title: "Smart Transactions", desc: "Organize and understand financial transactions." },
    { icon: <CheckSquare className="w-6 h-6 text-blue-600" />, title: "AI Reconciliation", desc: "Identify matches, duplicates and exceptions." },
    { icon: <FileText className="w-6 h-6 text-blue-600" />, title: "Invoices & Bills", desc: "Track receivables and payables in one place." },
    { icon: <PieChart className="w-6 h-6 text-blue-600" />, title: "Financial Reports", desc: "Understand income, expenses, cash flow and performance." },
    { icon: <MessageSquare className="w-6 h-6 text-blue-600" />, title: "AI Finance Assistant", desc: "Ask questions and get answers from your financial data." },
    { icon: <Shield className="w-6 h-6 text-blue-600" />, title: "Approvals & Audit Trail", desc: "Keep humans in control of important financial actions." }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white border-t">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-950 mb-16">Everything your finance team needs to stay ahead.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer bg-slate-50 hover:bg-white">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 mb-6">{f.desc}</p>
              <div className="flex items-center text-blue-600 font-medium text-sm">
                Learn more <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'DemoCTA.jsx': `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export function DemoCTA({ onWaitlistClick }) {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-6 bg-blue-50/80 border-y border-blue-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
          Don't just read about FinPilot.<br />Try it.
        </h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Explore a fictional Indian business and see how FinPilot handles transactions, reconciliation, invoices and financial questions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg" onClick={() => navigate('/demo')}>
            Launch Interactive Demo <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-blue-200 text-blue-800 hover:bg-blue-100" onClick={onWaitlistClick}>
            Join the Waitlist
          </Button>
        </div>
        <p className="mt-6 text-sm text-blue-600/70 font-medium">* Uses simulated financial data</p>
      </div>
    </section>
  );
}`,

  'AudienceSection.jsx': `
import React from 'react';

export function AudienceSection() {
  const audiences = [
    { title: "FOUNDERS", desc: "Know where your money is going without waiting for reports." },
    { title: "ACCOUNTANTS", desc: "Spend less time on repetitive reconciliation and data entry." },
    { title: "CFOs / FINANCE HEADS", desc: "Get a clearer view of cash, working capital and financial performance." },
    { title: "BUSINESS OWNERS", desc: "Understand the numbers and make decisions faster." }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {audiences.map((a, i) => (
          <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold tracking-widest text-blue-600 mb-4">{a.title}</div>
            <p className="text-xl text-slate-800 font-medium">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}`,

  'SecuritySection.jsx': `
import React from 'react';
import { Lock } from 'lucide-react';

export function SecuritySection() {
  return (
    <section id="security" className="py-24 px-6 bg-slate-900 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <div className="w-16 h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-blue-800">
          <Lock className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Built with financial data in mind.</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-2xl mx-auto mb-16">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-slate-300">Secure authentication</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-slate-300">Workspace-level access control</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-slate-300">Human approval for sensitive actions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-slate-300">Audit history</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-slate-300">Protected financial data</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-slate-300">No banking passwords collected in demo</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic max-w-lg mx-auto">
          FinPilot is currently in development. Demo environments use simulated financial data and make no compliance claims.
        </p>
      </div>
    </section>
  );
}`,

  'WaitlistCTA.jsx': `
import React from 'react';
import { Button } from '../ui/button';

export function WaitlistCTA({ onWaitlistClick }) {
  return (
    <section className="py-24 px-6 bg-blue-950 text-center border-t border-blue-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Finance is changing.<br />Get early access.</h2>
        <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
          Join the FinPilot early-access list and be among the first to experience AI-powered finance for Indian SMBs.
        </p>
        <Button size="lg" className="h-14 px-10 text-lg bg-blue-500 hover:bg-blue-400 text-white shadow-xl shadow-blue-900/50" onClick={onWaitlistClick}>
          Join the Waitlist
        </Button>
      </div>
    </section>
  );
}`,

  'FAQ.jsx': `
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQ() {
  const faqs = [
    { q: "What is FinPilot?", a: "FinPilot is an AI-powered finance workspace designed to help Indian SMBs organize financial data, automate repetitive work, review exceptions and understand business performance." },
    { q: "Does FinPilot connect to my bank?", a: "The current public demo does not connect to real banks. It uses simulated data. Real integrations will be introduced progressively." },
    { q: "Is the demo using real company financial data?", a: "No. The public demo uses simulated financial data." },
    { q: "Who is FinPilot for?", a: "FinPilot is designed for founders, business owners, accountants, CFOs and finance teams at small and medium-sized businesses." },
    { q: "Can I join the early-access program?", a: "Yes. Click Join Waitlist and submit your details." }
  ];

  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-950 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="font-semibold text-slate-900">{faq.q}</span>
                {open === i ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-slate-600">
                  {faq.a}
                </div>
              )}
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
    <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="text-2xl font-bold text-blue-950 flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">F</div>
            FINPILOT
          </div>
          <p className="text-sm text-slate-500 max-w-xs">AI-Powered Finance for Indian SMBs</p>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 mb-6">PRODUCT</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            <li><a href="#" className="hover:text-blue-600">Features</a></li>
            <li><a href="/demo" className="hover:text-blue-600">Interactive Demo</a></li>
            <li><a href="#" className="hover:text-blue-600">AI Assistant</a></li>
            <li><a href="#" className="hover:text-blue-600">Reconciliation</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 mb-6">COMPANY</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            <li><a href="#" className="hover:text-blue-600">About</a></li>
            <li><a href="#" className="hover:text-blue-600">Early Access</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 mb-6">LEGAL</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <div>© 2026 FinPilot. All rights reserved.</div>
        <div>FinPilot is currently in development. Demo data is simulated.</div>
      </div>
    </footer>
  );
}`,

  'WaitlistModal.jsx': `
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

export function WaitlistModal({ isOpen, onClose }) {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('http://localhost:5000/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      // Even if API fails due to no DB connection, simulate success for demo purposes if preferred, 
      // but the prompt says use existing backend.
      setStatus('error'); 
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        {status === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🚀</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">You're on the list</h3>
            <p className="text-slate-600 mb-8">We'll let you know as soon as FinPilot is ready for you.</p>
            <Button className="w-full" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-950">Be among the first to use FinPilot</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Name</label>
                <input required name="name" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Work Email</label>
                <input required type="email" name="email" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Company</label>
                <input required name="company" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Role</label>
                  <select required name="role" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select...</option>
                    <option>Founder</option><option>Business Owner</option><option>CFO</option><option>Finance Head</option><option>Accountant</option><option>CA</option><option>Finance Executive</option><option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Size</label>
                  <select required name="companySize" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select...</option>
                    <option>1–10</option><option>11–50</option><option>51–100</option><option>101–250</option><option>250+</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">What do you want to automate most?</label>
                <select name="automationInterest" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="">Select...</option>
                  <option>Bank reconciliation</option><option>Invoice management</option><option>Bills / AP</option><option>Receivables / collections</option><option>Financial reporting</option><option>Cash-flow analysis</option><option>Other</option>
                </select>
              </div>

              {status === 'error' && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                  There was an error saving your request. Ensure backend is running.
                </div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white pt-2 mt-4" disabled={status === 'loading'}>
                {status === 'loading' ? 'Joining...' : 'Join Early Access'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(basePath, filepath);
  fs.writeFileSync(fullPath, content);
  console.log('Created:', filepath);
});

// Update Landing.jsx to use these components
const landingPath = '/Users/vijaykota/Documents/FINPILOT/client/src/pages/Landing.jsx';
const landingContent = `
import React, { useState } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { ValueStrip } from '../components/landing/ValueStrip';
import { ProblemSection } from '../components/landing/ProblemSection';
import { WorkflowSection } from '../components/landing/WorkflowSection';
import { ProductShowcase } from '../components/landing/ProductShowcase';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { DemoCTA } from '../components/landing/DemoCTA';
import { AudienceSection } from '../components/landing/AudienceSection';
import { SecuritySection } from '../components/landing/SecuritySection';
import { WaitlistCTA } from '../components/landing/WaitlistCTA';
import { FAQ } from '../components/landing/FAQ';
import { Footer } from '../components/landing/Footer';
import { WaitlistModal } from '../components/landing/WaitlistModal';

export default function Landing() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);
  const closeWaitlist = () => setWaitlistOpen(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
      <Navbar onWaitlistClick={openWaitlist} />
      <Hero onWaitlistClick={openWaitlist} />
      <ValueStrip />
      <ProblemSection />
      <WorkflowSection />
      <ProductShowcase />
      <FeaturesSection />
      <DemoCTA onWaitlistClick={openWaitlist} />
      <AudienceSection />
      <SecuritySection />
      <WaitlistCTA onWaitlistClick={openWaitlist} />
      <FAQ />
      <Footer />
      
      <WaitlistModal isOpen={waitlistOpen} onClose={closeWaitlist} />
    </div>
  );
}
`;
fs.writeFileSync(landingPath, landingContent);
console.log('Updated Landing.jsx');
