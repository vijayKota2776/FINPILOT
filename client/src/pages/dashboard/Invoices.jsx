import React, { useContext, useEffect, useState } from 'react';
import { WorkspaceContext } from '../../context/WorkspaceContext';
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  Plus,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';

// Format currency
const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
};

const MetricCard = ({ title, amount, subtitle, icon: Icon, colorClass, loading }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className={`flex items-center gap-2 text-sm font-bold text-slate-900`}>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
          <Icon className="w-4 h-4" />
        </div>
        {title}
      </div>
    </div>
    {loading ? (
      <div className="h-8 bg-slate-100 rounded-lg animate-pulse w-3/4 mb-1"></div>
    ) : (
      <div className="text-3xl font-black text-slate-900 tracking-tight">{formatCurrency(amount)}</div>
    )}
    <div className="text-xs font-semibold text-slate-500 mt-2">{subtitle}</div>
  </div>
);

export default function Invoices() {
  const { activeCompany } = useContext(WorkspaceContext);
  const [data, setData] = useState({ invoices: [], metrics: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');

  const fetchInvoices = async () => {
    if (!activeCompany) return;
    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status !== 'ALL') params.append('status', status);
      
      const response = await fetch(`http://localhost:5001/api/companies/${activeCompany._id}/invoices?${params.toString()}`, {
        credentials: 'include'
      });
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error?.message || 'Failed to fetch invoices');
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
      fetchInvoices();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [activeCompany, search, status]);

  if (!activeCompany) return null;

  const { metrics, invoices } = data;

  const getStatusStyle = (status) => {
    switch(status) {
      case 'PAID': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'OVERDUE': return 'bg-red-50 text-red-700 border-red-100';
      case 'SENT': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'DRAFT': return 'bg-slate-50 text-slate-700 border-slate-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'PAID': return <CheckCircle2 className="w-3 h-3" />;
      case 'OVERDUE': return <AlertTriangle className="w-3 h-3" />;
      case 'SENT': return <ArrowUpRight className="w-3 h-3" />;
      case 'DRAFT': return <FileText className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Invoices</h1>
          <p className="text-slate-500 mt-1 font-medium">
            Accounts Receivable for <span className="text-slate-700 font-bold">{activeCompany.displayName}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Invoice
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          title="Total Outstanding" 
          amount={metrics.totalOutstanding} 
          subtitle="Sent and Overdue"
          icon={Clock}
          colorClass="bg-blue-100 text-blue-600"
          loading={loading}
        />
        <MetricCard 
          title="Overdue" 
          amount={metrics.totalOverdue} 
          subtitle="Requires immediate action"
          icon={AlertTriangle}
          colorClass="bg-red-100 text-red-600"
          loading={loading}
        />
        <MetricCard 
          title="Paid This Month" 
          amount={metrics.totalPaidThisMonth} 
          subtitle="Collected revenue"
          icon={CheckCircle2}
          colorClass="bg-emerald-100 text-emerald-600"
          loading={loading}
        />
        <MetricCard 
          title="Drafts" 
          amount={metrics.totalDraft} 
          subtitle="Unsent invoices"
          icon={FileText}
          colorClass="bg-slate-100 text-slate-600"
          loading={loading}
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Filters Header */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search customer or invoice number..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="ALL">All Statuses</option>
              <option value="SENT">Sent</option>
              <option value="PAID">Paid</option>
              <option value="OVERDUE">Overdue</option>
              <option value="DRAFT">Draft</option>
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
                <th className="px-6 py-4">Invoice</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="h-10 bg-slate-100 rounded-lg animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-100 rounded animate-pulse w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-100 rounded animate-pulse w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-100 rounded animate-pulse ml-auto w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-100 rounded animate-pulse w-16"></div></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                      <FileText className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="text-lg font-bold text-slate-900 mb-1">No invoices found</div>
                    <div className="text-slate-500 font-medium">Create your first invoice to get started.</div>
                  </td>
                </tr>
              ) : (
                invoices.map(inv => (
                  <tr key={inv._id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{inv.invoiceNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-slate-900">{inv.customerName}</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">{inv.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-semibold text-slate-700">Issued: {formatDate(inv.issueDate)}</div>
                      <div className={`text-xs font-bold mt-0.5 ${inv.status === 'OVERDUE' ? 'text-red-500' : 'text-slate-500'}`}>
                        Due: {formatDate(inv.dueDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm font-black text-slate-900">{formatCurrency(inv.amount)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(inv.status)}`}>
                        {getStatusIcon(inv.status)}
                        {inv.status}
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
      </div>
    </div>
  );
}
