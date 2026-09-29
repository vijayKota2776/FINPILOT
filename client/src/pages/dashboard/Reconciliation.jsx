import React, { useState } from 'react';
import { Search, CheckCircle2, AlertCircle, RefreshCcw, MoreHorizontal, Filter } from 'lucide-react';

export default function Reconciliation() {
  const [activeTab, setActiveTab] = useState('All');

  // Mock data based on the provided reference
  const transactions = [
    {
      id: 1,
      counterparty: 'RAZORPAY SOFTWARE SERVICES',
      description: 'Razorpay Software Services - INV-2175',
      date: '28 Jun 2025',
      amount: -118000,
      classification: 'Software & SaaS',
      classificationSub: 'Software Expenses',
      signal: 'review',
      confidence: '0%'
    },
    {
      id: 2,
      counterparty: 'Infosys Limited monthly transfer',
      description: 'Known finance counterparty - UTR800447',
      date: '28 Jun 2025',
      amount: 73239,
      classification: 'Customer receipts',
      classificationSub: 'Revenue',
      signal: 'matched',
      confidence: '100%'
    },
    {
      id: 3,
      counterparty: 'ICICI Bank monthly transfer',
      description: 'Known finance counterparty - UTR800419',
      date: '28 Jun 2025',
      amount: -69403,
      classification: 'Operating expenses',
      classificationSub: 'Operating Expenses',
      signal: 'matched',
      confidence: '100%'
    },
    {
      id: 4,
      counterparty: 'ABC SUPPLIERS PAYMENT',
      description: 'Vendor payment - REF90021',
      date: '27 Jun 2025',
      amount: -45000,
      classification: 'Operating expenses',
      classificationSub: 'Operating Expenses',
      signal: 'duplicate',
      confidence: '85%'
    }
  ];

  const tabs = ['All', 'Review', 'Matched', 'Duplicate'];

  const filteredTransactions = transactions.filter(t => {
    if (activeTab === 'All') return true;
    return t.signal.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Control Room - Bank Feed
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reconciliation</h1>
          <p className="text-slate-500 mt-2 font-medium">Bring bank activity into one reviewable queue. FINPILOT shows its work before you approve it.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-50 transition-colors"></div>
          <div className="relative z-10">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Showing</div>
            <div className="text-4xl font-black text-slate-900 mb-1">200</div>
            <div className="text-sm font-medium text-slate-500">bank transactions</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Review Queue
            </div>
            <div className="text-4xl font-black text-blue-900 mb-1">30</div>
            <div className="text-sm font-medium text-blue-600/80">need a human decision</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
               Signal Quality
            </div>
            <div className="text-4xl font-black text-emerald-600 mb-1">99%</div>
            <div className="text-sm font-medium text-slate-500">average AI confidence</div>
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search description or counterparty..." 
                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
            <button className="p-2.5 border border-slate-200 bg-white rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                <th className="px-6 py-4 font-bold">Transaction</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold text-right">Amount</th>
                <th className="px-6 py-4 font-bold">Classification</th>
                <th className="px-6 py-4 font-bold">Signal</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                  
                  {/* Transaction Info */}
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 border border-slate-200/50 text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{tx.counterparty}</div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5 truncate max-w-[250px]">{tx.description}</div>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-sm font-semibold text-slate-600 whitespace-nowrap">
                    {tx.date}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <span className={`text-sm font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.amount > 0 ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Classification */}
                  <td className="px-6 py-5">
                    <div className="font-bold text-sm text-slate-900">{tx.classification}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">{tx.classificationSub}</div>
                  </td>

                  {/* Signal */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-start gap-1">
                      {tx.signal === 'review' && (
                        <div className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider border border-amber-200">
                          Review
                        </div>
                      )}
                      {tx.signal === 'matched' && (
                        <div className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                          Matched
                        </div>
                      )}
                      {tx.signal === 'duplicate' && (
                        <div className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider border border-slate-200">
                          Duplicate
                        </div>
                      )}
                      <div className="text-[10px] font-semibold text-slate-400 pl-1">{tx.confidence} confidence</div>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-right">
                     <button className="w-8 h-8 rounded-lg flex items-center justify-center ml-auto text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                       <MoreHorizontal className="w-5 h-5" />
                     </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination / Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-sm">
          <div className="font-medium text-slate-500">Showing 1 to {filteredTransactions.length} of 200 entries</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg bg-white font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">Previous</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg bg-white font-medium text-slate-600 hover:bg-slate-50">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
