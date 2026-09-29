
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}``)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div className="flex items-center justify-center h-full text-slate-400">Loading dashboard...</div>;

  return (
    <div className="animate-in fade-in duration-500 relative pb-24 h-full flex flex-col">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <LayoutDashboard className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Step 4: Understand</h1>
          <p className="text-slate-600 mt-1">With data processed and reconciled, you get real-time visibility into business health.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
             <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Income</div>
             <div className="text-2xl font-bold text-slate-900">₹{data.metrics.totalIncome.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
             <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Expenses</div>
             <div className="text-2xl font-bold text-slate-900">₹{data.metrics.totalExpenses.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
             <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Net Profit</div>
             <div className="text-2xl font-bold text-green-600">₹{data.metrics.netProfit.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl text-white">
             <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cash Balance</div>
             <div className="text-2xl font-bold">₹{data.metrics.cashBalance.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Cash Flow (Last 6 Months)</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.cashFlow || [
                { month: "Jan", inflow: 850000, outflow: 620000 },
                { month: "Feb", inflow: 910000, outflow: 750000 },
                { month: "Mar", inflow: 1100000, outflow: 890000 },
                { month: "Apr", inflow: 1245000, outflow: 832000 },
                { month: "May", inflow: 1050000, outflow: 780000 },
                { month: "Jun", inflow: 1320000, outflow: 910000 }
              ]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, '']}
                />
                <Bar dataKey="inflow" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Inflow" />
                <Bar dataKey="outflow" fill="#ef4444" radius={[6, 6, 0, 0]} name="Outflow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full p-6 animate-in slide-in-from-bottom-4 duration-500 flex justify-end pointer-events-none">
        <button onClick={() => navigate('/demo/act')} className="pointer-events-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
          Final Step: Query AI <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}