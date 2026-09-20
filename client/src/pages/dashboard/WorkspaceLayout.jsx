import React, { useEffect, useContext } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { WorkspaceContext } from '../../context/WorkspaceContext';

export default function WorkspaceLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { companies, activeCompany, switchWorkspace, loading } = useContext(WorkspaceContext);

  useEffect(() => {
    if (!loading && companies.length === 0) {
      navigate('/onboarding');
    }
  }, [loading, companies, navigate]);

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-slate-50">Loading Workspace...</div>;
  }

  // If no companies, don't render layout (useEffect will handle redirect)
  if (companies.length === 0) {
    return null;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 text-white flex flex-col flex-shrink-0 z-20">
        <div className="p-6 border-b border-slate-800">
          <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-black shadow-inner">F</div>
            FINPILOT
          </div>
        </div>

        <div className="p-4 flex-1">
          <div className="space-y-1">
            <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600/10 text-blue-400 font-medium text-sm">
              Dashboard
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-medium text-sm transition-colors">
              Transactions
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-medium text-sm transition-colors">
              Reconciliation
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-medium text-sm transition-colors">
              Invoices
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-medium text-sm transition-colors">
              AI Assistant
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-medium text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 flex-shrink-0 shadow-sm">
          {/* Workspace Selector */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold text-sm">
              {activeCompany?.displayName?.charAt(0) || 'C'}
            </div>
            
            <div className="relative group">
              <button className="flex flex-col items-start text-left focus:outline-none">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{activeCompany?.displayName || 'Workspace'}</span>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Role: {activeCompany?.myRole?.replace('_', ' ') || 'MEMBER'}
                </span>
              </button>
              
              {/* Dropdown for multi-tenant switching */}
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2">
                  <div className="text-xs font-semibold text-slate-400 px-3 py-2 uppercase tracking-wider">Switch Workspace</div>
                  {companies.map(c => (
                    <button 
                      key={c._id}
                      onClick={() => switchWorkspace(c._id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${c._id === activeCompany?._id ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      {c.displayName}
                    </button>
                  ))}
                  <div className="h-px bg-slate-100 my-1 mx-2"></div>
                  <button onClick={() => navigate('/onboarding')} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                    + Create new company
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <div className="text-sm font-bold text-slate-900">{user?.name}</div>
               <div className="text-xs text-slate-500">{user?.email}</div>
             </div>
             <div className="w-9 h-9 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-700">
               {user?.name?.charAt(0) || 'U'}
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50/50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
