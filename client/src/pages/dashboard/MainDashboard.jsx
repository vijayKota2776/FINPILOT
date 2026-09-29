import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { WorkspaceContext } from '../../context/WorkspaceContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCcw, 
  AlertCircle,
  Activity,
  CreditCard,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Bell
} from 'lucide-react';

// --- Shared Components ---

const SkeletonCard = ({ className = "" }) => (
  <div className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm animate-pulse ${className}`}>
    <div className="h-4 w-1/3 bg-slate-200 rounded mb-4"></div>
    <div className="h-8 w-2/3 bg-slate-200 rounded mb-2"></div>
    <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
  </div>
);

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
    {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
  </div>
);

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const formatted = abs >= 100000 
    ? `${(abs / 100000).toFixed(1)}L` 
    : abs.toLocaleString('en-IN');
  return `${isNegative ? '-' : ''}₹${formatted}`;
};

// --- Main Dashboard Component ---

export default function MainDashboard() {
  const { activeCompany } = useContext(WorkspaceContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('this_month');
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async (isRefresh = false) => {
    if (!activeCompany) return;
    
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/companies/${activeCompany._id}/dashboard?period=${period}`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setData(data.data);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while loading financial data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activeCompany, period]);

  // Handle No Company state
  if (!activeCompany) {
    return <div className="p-8 text-center text-slate-500">Please select a workspace.</div>;
  }

  // --- Sub-sections ---

  const renderHeader = () => (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Overview</h1>
        <p className="text-slate-500 mt-1 font-medium">
          Executive summary for <span className="text-slate-700 font-bold">{activeCompany.displayName}</span>
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <select 
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
        >
          <option value="this_month">This Month</option>
          <option value="last_month">Last Month</option>
          <option value="last_3_months">Last 3 Months</option>
          <option value="last_6_months">Last 6 Months</option>
          <option value="this_year">This Year</option>
        </select>
        
        <button 
          onClick={() => fetchDashboardData(true)}
          className={`p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all shadow-sm ${refreshing ? 'animate-spin text-blue-500' : ''}`}
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="bg-red-50 border border-red-100 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">We couldn't load your financial overview</h3>
      <p className="text-slate-500 mb-6 max-w-md">There was a problem communicating with the financial data service. Please try again.</p>
      <button 
        onClick={() => fetchDashboardData()}
        className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  const renderEmptyState = () => (
    <div className="bg-white border border-slate-200 p-12 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm">
      <div className="w-20 h-20 bg-slate-50 border border-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Building2 className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Your financial workspace is ready.</h3>
      <p className="text-slate-500 mb-8 max-w-md text-lg">Connect a bank account or import financial data to start seeing your financial health here.</p>
      <div className="flex gap-4">
        <Link to="/dashboard/connections" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
          Connect Account
        </Link>
        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
          Import CSV
        </button>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 pb-12">
      {renderHeader()}
      {renderError()}
    </div>
  );

  if (!loading && !data) return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 pb-12">
      {renderHeader()}
      {renderEmptyState()}
    </div>
  );

  // Safely destructure data with fallbacks for loading state
  const {
    summary = {},
    cashFlow = [],
    accounts = [],
    receivables = {},
    payables = {},
    reconciliation = {},
    signals = [],
    actions = [],
    recentActivity = []
  } = data || {};

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 pb-12">
      {renderHeader()}

      {/* 1. FINANCIAL SNAPSHOT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {loading ? (
          Array(5).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
               <div className="relative z-10">
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">Cash Balance</div>
                 <div className="text-3xl font-black">{formatCurrency(summary.cashBalance)}</div>
               </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Revenue</div>
               <div className="text-2xl font-black text-slate-900">{formatCurrency(summary.revenue)}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Expenses</div>
               <div className="text-2xl font-black text-slate-900">{formatCurrency(summary.expenses)}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Net Cash Flow</div>
               <div className={`text-2xl font-black flex items-center gap-1 ${summary.netCashFlow >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                 {summary.netCashFlow >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                 {formatCurrency(Math.abs(summary.netCashFlow))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 shadow-sm transition-shadow hover:shadow-md">
               <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">Runway</div>
               <div className="text-2xl font-black text-indigo-900">{summary.runway} <span className="text-sm font-bold text-indigo-600/60">months</span></div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* 2. CASH FLOW CHART */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Cash Flow</h2>
            <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
               <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-500"></div> In</div>
               <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-slate-900"></div> Out</div>
            </div>
          </div>
          
          {loading ? (
            <div className="h-72 w-full bg-slate-50 animate-pulse rounded-xl"></div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashFlow} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} tickFormatter={(val) => `₹${val/100000}L`} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 600 }}
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, '']}
                  />
                  <Bar dataKey="inflow" fill="#10b981" radius={[4, 4, 0, 0]} name="Cash In" />
                  <Bar dataKey="outflow" fill="#0f172a" radius={[4, 4, 0, 0]} name="Cash Out" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* 3. ACTION CENTER */}
        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-200">
          <SectionHeading title="Action Center" subtitle="Items requiring your attention" />
          
          {loading ? (
            <div className="space-y-3">
              <div className="h-16 bg-white border border-slate-200 rounded-xl animate-pulse"></div>
              <div className="h-16 bg-white border border-slate-200 rounded-xl animate-pulse"></div>
            </div>
          ) : actions.length === 0 ? (
             <div className="text-center py-8 text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
               <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-slate-300" />
               <div className="font-bold">Everything looks clear.</div>
             </div>
          ) : (
            <div className="space-y-3">
              {actions.map(action => (
                <div key={action.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5"><AlertCircle className="w-4 h-4 text-amber-500" /></div>
                    <div className="text-sm font-semibold text-slate-700 pr-2">{action.text}</div>
                  </div>
                  <Link to={action.actionUrl} className="shrink-0 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {action.actionText}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* 4. RECEIVABLES & PAYABLES */}
        <div className="space-y-4">
           {loading ? (
             <SkeletonCard className="h-40" />
           ) : (
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-[170px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center"><ArrowDownRight className="w-3.5 h-3.5" /></div>
                    Accounts Receivable
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900">{formatCurrency(receivables.outstanding)}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Total Outstanding</div>
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <div className="text-slate-600"><span className="text-amber-500">{formatCurrency(receivables.dueSoon)}</span> due soon</div>
                  <div className="text-slate-600"><span className="text-red-500">{formatCurrency(receivables.overdue)}</span> overdue</div>
                </div>
             </div>
           )}

           {loading ? (
             <SkeletonCard className="h-40" />
           ) : (
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-[170px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <div className="w-6 h-6 rounded bg-rose-100 text-rose-600 flex items-center justify-center"><ArrowUpRight className="w-3.5 h-3.5" /></div>
                    Accounts Payable
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900">{formatCurrency(payables.outstanding)}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Total Outstanding</div>
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <div className="text-slate-600"><span className="text-amber-500">{formatCurrency(payables.dueSoon)}</span> due soon</div>
                  <div className="text-slate-600"><span className="text-red-500">{formatCurrency(payables.overdue)}</span> overdue</div>
                </div>
             </div>
           )}
        </div>

        {/* 5. ACCOUNTS OVERVIEW */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <SectionHeading title="Connected Accounts" />
          {loading ? (
            <div className="space-y-4 flex-1">
               <div className="h-12 bg-slate-50 animate-pulse rounded-lg"></div>
               <div className="h-12 bg-slate-50 animate-pulse rounded-lg"></div>
               <div className="h-12 bg-slate-50 animate-pulse rounded-lg"></div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="space-y-4 flex-1">
                {accounts.map(acc => (
                  <div key={acc.id} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{acc.bank}</div>
                        <div className="text-xs font-semibold text-slate-500">{acc.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900">{formatCurrency(acc.balance)}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${acc.status === 'Connected' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {acc.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/dashboard/connections" className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700 w-fit">Manage connections →</Link>
            </div>
          )}
        </div>

        {/* 6. AI FINANCIAL SIGNALS */}
        <div className="bg-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <h2 className="text-lg font-bold text-white">AI Financial Signals</h2>
          </div>

          {loading ? (
             <div className="space-y-4 flex-1">
               <div className="h-24 bg-slate-900 animate-pulse rounded-xl"></div>
               <div className="h-24 bg-slate-900 animate-pulse rounded-xl"></div>
             </div>
          ) : signals.length === 0 ? (
             <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                <Activity className="w-8 h-8 mb-2 opacity-50" />
                <div className="text-sm font-semibold">No active signals</div>
             </div>
          ) : (
            <div className="space-y-4 flex-1">
              {signals.map(signal => (
                <div key={signal.id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{signal.title}</div>
                  <div className="text-sm text-slate-300 font-medium mb-3 leading-relaxed">{signal.description}</div>
                  {signal.metrics && (
                    <div className="text-sm font-black text-white mb-3">{signal.metrics}</div>
                  )}
                  <Link to={signal.actionUrl} className="text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors inline-block">
                    {signal.actionText}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 7. RECONCILIATION HEALTH */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden group">
          <SectionHeading title="Reconciliation" subtitle="Bank feed status" />
          
          {loading ? (
            <div className="h-24 bg-white/50 animate-pulse rounded-xl"></div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-3xl font-black text-blue-900">{reconciliation.review}</div>
                  <div className="text-[10px] font-bold text-blue-600/80 uppercase tracking-widest mt-1">Review Queue</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-emerald-600">{reconciliation.matched}</div>
                  <div className="text-[10px] font-bold text-emerald-600/80 uppercase tracking-widest mt-1">Matched</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm font-bold bg-white/60 p-3 rounded-xl border border-blue-100 mb-4">
                 <div className="text-slate-700">AI Signal Quality</div>
                 <div className="text-emerald-600">{reconciliation.signalQuality}%</div>
              </div>
              <Link to="/dashboard/reconciliation" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 w-fit">
                View control room <ArrowUpRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>

        {/* 8. RECENT ACTIVITY */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            <Link to="/dashboard/transactions" className="text-sm font-bold text-slate-500 hover:text-slate-900">View all →</Link>
          </div>
          
          {loading ? (
             <div className="p-6 space-y-4">
               <div className="h-10 bg-slate-50 animate-pulse rounded-lg"></div>
               <div className="h-10 bg-slate-50 animate-pulse rounded-lg"></div>
               <div className="h-10 bg-slate-50 animate-pulse rounded-lg"></div>
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50">
                  <tr className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    <th className="px-6 py-3">Transaction</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentActivity.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="font-bold text-sm text-slate-900">{tx.counterparty}</div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">
                          {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md inline-block">
                          {tx.classification}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <span className={`text-sm font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                          {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
