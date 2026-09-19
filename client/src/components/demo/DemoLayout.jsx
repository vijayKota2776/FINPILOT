
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, CheckSquare, MessageSquare, ArrowLeft } from 'lucide-react';

export function DemoLayout() {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/demo', end: true, icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Transactions', path: '/demo/transactions', end: false, icon: <ListOrdered className="w-4 h-4" /> },
    { name: 'Reconciliation', path: '/demo/reconciliation', end: false, icon: <CheckSquare className="w-4 h-4" /> },
    { name: 'AI Assistant', path: '/demo/assistant', end: false, icon: <MessageSquare className="w-4 h-4" /> }
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 text-white flex flex-col flex-shrink-0">
        <div className="p-6">
          <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-black shadow-inner">F</div>
            FINPILOT
          </div>
          <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4">Workspace</div>
          <nav className="flex flex-col gap-1">
            {navItems.map(item => (
              <NavLink 
                key={item.name} 
                to={item.path} 
                end={item.end}
                className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-900">
           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-white transition-colors">
             <ArrowLeft className="w-3 h-3" /> Back to Website
           </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-50 relative">
        <div className="absolute top-0 right-0 p-4">
          <div className="bg-amber-100/50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm flex items-center gap-1.5">
             <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
             Demo Environment
          </div>
        </div>
        <div className="p-8 max-w-6xl mx-auto h-full">
           <Outlet />
        </div>
      </div>
    </div>
  );
}