
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Link2, Cpu, CheckSquare, LayoutDashboard, MessageSquare, ArrowLeft } from 'lucide-react';

export function DemoLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const steps = [
    { name: 'Connect', path: '/demo/connect', icon: <Link2 className="w-5 h-5" />, desc: 'Link bank accounts' },
    { name: 'Process', path: '/demo/process', icon: <Cpu className="w-5 h-5" />, desc: 'AI categorization' },
    { name: 'Review', path: '/demo/review', icon: <CheckSquare className="w-5 h-5" />, desc: 'Reconcile matches' },
    { name: 'Understand', path: '/demo/understand', icon: <LayoutDashboard className="w-5 h-5" />, desc: 'View insights' },
    { name: 'Act', path: '/demo/act', icon: <MessageSquare className="w-5 h-5" />, desc: 'Query AI Assistant' }
  ];

  const currentStepIndex = steps.findIndex(s => location.pathname === s.path);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar Stepper */}
      <div className="w-full md:w-80 bg-slate-950 text-white flex flex-col flex-shrink-0 relative overflow-hidden z-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="p-8 pb-4">
          <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-black shadow-inner">F</div>
            FINPILOT
          </div>
          <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-6">Product Tour</div>
          
          <div className="flex flex-col gap-8 relative">
            {/* Connecting line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-800 z-0 hidden md:block"></div>
            
            {steps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isPast = index < currentStepIndex;
              return (
                <div key={step.name} className="flex gap-4 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    isActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 
                    isPast ? 'bg-slate-800 text-slate-300' : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="pt-1">
                    <div className={`font-bold text-sm ${isActive ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-500'}`}>{step.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-auto p-8 pt-4">
           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors">
             <ArrowLeft className="w-4 h-4" /> Exit Tour
           </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-50 relative">
        <div className="absolute top-0 right-0 p-6 z-20">
          <div className="bg-amber-100/80 backdrop-blur text-amber-800 border border-amber-200 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
             Interactive Demo
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto h-full flex flex-col pt-12 p-8">
           <div className="flex-1 min-h-0 relative">
             <Outlet />
           </div>
        </div>
      </div>
    </div>
  );
}