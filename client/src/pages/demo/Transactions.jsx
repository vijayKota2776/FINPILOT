
import React, { useState, useEffect } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}`)
      .then(res => res.json())
      .then(json => setTransactions(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
        <p className="text-slate-500 mt-1">Review your recent synced banking activity.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors text-sm">
                  <td className="p-4 text-slate-600 whitespace-nowrap">{new Date(t.date).toLocaleDateString('en-IN', {month:'short', day:'numeric'})}</td>
                  <td className="p-4 font-medium text-slate-900">{t.description}</td>
                  <td className="p-4 text-slate-500">{t.category}</td>
                  <td className={`p-4 text-right font-bold ${t.type === 'credit' ? 'text-green-600' : 'text-slate-900'}`}>
                    {t.type === 'credit' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${t.status === 'reconciled' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                 <tr><td colSpan="5" className="p-8 text-center text-slate-400">Loading transactions...</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}