import React, { useContext, useEffect, useState } from 'react';
import { WorkspaceContext } from '../../context/WorkspaceContext';
import { 
  Search, 
  Filter, 
  ArrowDownRight, 
  ArrowUpRight, 
  MoreHorizontal,
  ChevronDown,
  Download,
  BrainCircuit,
  AlertCircle
} from 'lucide-react';

// Format currency
const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  return `${isNegative ? '-' : ''}₹${abs.toLocaleString('en-IN')}`;
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
};

export default function Transactions() {
  const { activeCompany } = useContext(WorkspaceContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [type, setType] = useState('ALL');
  const [category, setCategory] = useState('ALL');

  const fetchTransactions = async () => {
    if (!activeCompany) return;
    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (type !== 'ALL') params.append('type', type);
      if (category !== 'ALL') params.append('category', category);
      
      const response = await fetch(`http://localhost:5001/api/companies/${activeCompany._id}/transactions?${params.toString()}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setTransactions(data.data);
      } else {
        setError(data.error?.message || 'Failed to fetch transactions');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTransactions();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [activeCompany, search, type, category]);

  const updateCategory = async (id, newCategory) => {
    try {
      const response = await fetch(`http://localhost:5001/api/companies/${activeCompany._id}/transactions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ category: newCategory })
      });
      const data = await response.json();
      if (data.success) {
        setTransactions(transactions.map(tx => tx._id === id ? { ...tx, category: newCategory } : tx));
      }
    } catch (err) {
      console.error('Failed to update category', err);
    }
  };

  if (!activeCompany) return null;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ledger</h1>
          <p className="text-slate-500 mt-1 font-medium">
            Master transaction record for <span className="text-slate-700 font-bold">{activeCompany.displayName}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
            + New Transaction
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Filters Header */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search counterparty or description..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="ALL">All Types</option>
              <option value="INFLOW">Cash In</option>
              <option value="OUTFLOW">Cash Out</option>
            </select>
            
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="ALL">All Categories</option>
              <option value="Revenue">Revenue</option>
              <option value="Software Subscriptions">Software</option>
              <option value="Payroll">Payroll</option>
              <option value="Marketing">Marketing</option>
              <option value="Legal">Legal</option>
            </select>
            
            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 bg-white hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b border-slate-100">
              <tr className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="h-10 bg-slate-100 rounded-lg animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-100 rounded animate-pulse w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-100 rounded animate-pulse ml-auto w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-100 rounded animate-pulse w-16"></div></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                      <Search className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="text-lg font-bold text-slate-900 mb-1">No transactions found</div>
                    <div className="text-slate-500 font-medium">Try adjusting your filters or search query.</div>
                  </td>
                </tr>
              ) : (
                transactions.map(tx => (
                  <tr key={tx._id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'INFLOW' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                          {tx.type === 'INFLOW' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{tx.counterparty}</div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1 max-w-md">{tx.description}</div>
                          <div className="text-[10px] text-slate-400 font-bold mt-1 tracking-wider uppercase">{formatDate(tx.date)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group/select inline-block">
                        <select
                          value={tx.category}
                          onChange={(e) => updateCategory(tx._id, e.target.value)}
                          className="appearance-none bg-slate-100/80 hover:bg-slate-200 border border-transparent hover:border-slate-300 text-xs font-semibold text-slate-700 px-3 py-1.5 rounded-lg pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                        >
                          <option value={tx.category}>{tx.category}</option>
                          <option disabled>──────────</option>
                          <option value="Revenue">Revenue</option>
                          <option value="Software Subscriptions">Software</option>
                          <option value="Payroll">Payroll</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Legal">Legal</option>
                          <option value="Office Supplies">Office Supplies</option>
                          <option value="Uncategorized">Uncategorized</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
                      </div>
                      
                      {tx.aiClassification?.confidence > 0 && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 mt-1.5 ml-1">
                          <BrainCircuit className="w-3 h-3" />
                          AI Suggested • {tx.aiClassification.confidence}% match
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        tx.status === 'CLEARED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        tx.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {tx.status === 'PENDING' && <AlertCircle className="w-3 h-3" />}
                        {tx.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-500">
            Showing {transactions.length} records
          </div>
          <div className="flex items-center gap-2">
            <button disabled className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold bg-white text-slate-400">Previous</button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
