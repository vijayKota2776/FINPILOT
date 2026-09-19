
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
}