
import React from 'react';
import { Lock, UserCheck, Database, History } from 'lucide-react';

export function SecuritySection() {
  return (
    <section id="security" className="py-32 px-6 bg-slate-950 border-t border-slate-900 text-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold tracking-widest uppercase mb-8">
          Enterprise Grade
        </div>
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-16 tracking-tight">Built on a secure foundation.</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { icon: <Lock className="w-5 h-5"/>, title: "Secure Data", desc: "Workspace-level isolation." },
             { icon: <UserCheck className="w-5 h-5"/>, title: "Access Control", desc: "Role-based permissions." },
             { icon: <History className="w-5 h-5"/>, title: "Audit Trails", desc: "Every action logged." },
             { icon: <Database className="w-5 h-5"/>, title: "Read-only", desc: "No unwanted write access." }
           ].map((s,i) => (
             <div key={i} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl text-left">
               <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400 mb-4">{s.icon}</div>
               <h3 className="text-white font-semibold mb-2">{s.title}</h3>
               <p className="text-slate-400 text-sm">{s.desc}</p>
             </div>
           ))}
        </div>
        <p className="text-xs text-slate-600 mt-16 max-w-lg mx-auto">
          FinPilot is currently in development. Demo environments use simulated financial data and make no compliance claims. No banking passwords collected.
        </p>
      </div>
    </section>
  );
}