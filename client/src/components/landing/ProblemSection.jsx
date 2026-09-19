
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
}