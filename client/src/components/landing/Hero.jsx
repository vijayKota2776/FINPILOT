
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
                             <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all" style={{height: `${h}%`}}></div>
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
}