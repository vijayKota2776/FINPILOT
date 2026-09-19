
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
}