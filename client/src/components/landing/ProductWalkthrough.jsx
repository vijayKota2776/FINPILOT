
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
                className={`text-left p-6 rounded-2xl transition-all ${activeTab === i ? 'bg-white shadow-xl shadow-slate-200/50 border border-slate-200/60' : 'hover:bg-slate-100 border border-transparent'}`}
              >
                <div className="flex items-start gap-4">
                   <div className={`text-sm font-bold mt-1 ${activeTab === i ? 'text-blue-600' : 'text-slate-400'}`}>{tab.num}</div>
                   <div>
                     <h3 className={`text-xl font-bold mb-2 ${activeTab === i ? 'text-slate-900' : 'text-slate-600'}`}>{tab.title}</h3>
                     <p className={`text-sm ${activeTab === i ? 'text-slate-600' : 'text-slate-400'}`}>{tab.desc}</p>
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
                       {[10,30,20,50,40,60,50,80].map((h,i) => <div key={i} className="flex-1 bg-blue-200 rounded-t-sm" style={{height:`${h}%`}}></div>)}
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
}