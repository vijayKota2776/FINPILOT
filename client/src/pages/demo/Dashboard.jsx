
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/demo/dashboard')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div className="flex items-center justify-center h-full text-slate-400">Loading dashboard...</div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Good morning.</h1>
        <p className="text-slate-500 mt-1">Here is your business at a glance.</p>
      </div>

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
           <div className="text-2xl font-bold text-blue-600">₹{data.metrics.netProfit.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white">
           <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cash Balance</div>
           <div className="text-2xl font-bold">₹{data.metrics.cashBalance.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Cash Flow (Last 6 Months)</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.cashFlow} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, '']}
              />
              <Bar dataKey="inflow" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Inflow" />
              <Bar dataKey="outflow" fill="#ef4444" radius={[4, 4, 0, 0]} name="Outflow" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}