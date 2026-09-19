
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
                  {[3,5,4,7,6,8,5,9,10,8,12,11].map((h,i) => <div key={i} className="flex-1 bg-slate-700 hover:bg-blue-500 transition-colors rounded-t-sm" style={{height:`${h*8}%`}}></div>)}
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
}