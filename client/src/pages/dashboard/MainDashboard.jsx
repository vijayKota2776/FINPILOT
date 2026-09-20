import React, { useContext } from 'react';
import { WorkspaceContext } from '../../context/WorkspaceContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MainDashboard() {
  const { activeCompany } = useContext(WorkspaceContext);

  // Mock data for the real dashboard until API is wired up
  const cashFlow = [
    { month: "Jan", inflow: 850000, outflow: 620000 },
    { month: "Feb", inflow: 910000, outflow: 750000 },
    { month: "Mar", inflow: 1100000, outflow: 890000 },
    { month: "Apr", inflow: 1245000, outflow: 832000 },
    { month: "May", inflow: 1050000, outflow: 780000 },
    { month: "Jun", inflow: 1320000, outflow: 910000 }
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back to {activeCompany?.displayName || 'your workspace'}. Here's what's happening today.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
           <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Cash Balance</div>
           <div className="text-3xl font-bold text-slate-900">₹4,250,000</div>
           <div className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
             +12.5% from last month
           </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
           <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Inflow</div>
           <div className="text-3xl font-bold text-slate-900">₹1,320,000</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
           <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Outflow</div>
           <div className="text-3xl font-bold text-slate-900">₹910,000</div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
           <div className="relative z-10">
             <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">Net Profit (MTD)</div>
             <div className="text-3xl font-bold">₹410,000</div>
             <div className="text-xs text-blue-300 font-medium mt-2">Target: ₹500,000</div>
           </div>
        </div>
      </div>

      {/* Main Chart area */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Cash Flow Trend</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlow} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, '']}
              />
              <Bar dataKey="inflow" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Inflow" />
              <Bar dataKey="outflow" fill="#0f172a" radius={[6, 6, 0, 0]} name="Outflow" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
