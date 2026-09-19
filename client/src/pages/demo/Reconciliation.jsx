
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Reconciliation() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setItems([
        {
          id: 1,
          bankTx: { description: 'AWS India', date: '2025-04-03', amount: -12500 },
          ledgerEntry: { description: 'Software & Cloud', invoiceRef: 'INV-20239', amount: -12500 },
          confidence: 99
        },
        {
          id: 2,
          bankTx: { description: 'ABC Traders', date: '2025-04-05', amount: 45000 },
          ledgerEntry: { description: 'Accounts Receivable', invoiceRef: 'INV-1021', amount: 45000 },
          confidence: 96
        }
      ]);
      setLoading(false);
    }, 1000);
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
}