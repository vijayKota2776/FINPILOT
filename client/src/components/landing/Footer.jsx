
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="text-xl font-bold tracking-tight text-slate-950 flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-black">F</div>
            FINPILOT
          </div>
          <p className="text-sm text-slate-500 font-medium max-w-xs">Intelligent finance for modern teams.</p>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 mb-6 text-sm tracking-wider uppercase">Product</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-500">
            <li><a href="#features" className="hover:text-slate-900 transition-colors">Features</a></li>
            <li><a href="/demo" className="hover:text-slate-900 transition-colors">Interactive Demo</a></li>
            <li><a href="#how-it-works" className="hover:text-slate-900 transition-colors">Workflow</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 mb-6 text-sm tracking-wider uppercase">Company</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-500">
            <li><a href="#" className="hover:text-slate-900 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Early Access</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 mb-6 text-sm tracking-wider uppercase">Legal</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-500">
            <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
        <div>© 2026 FinPilot. All rights reserved.</div>
        <div>FinPilot is in development. Demo data is simulated.</div>
      </div>
    </footer>
  );
}