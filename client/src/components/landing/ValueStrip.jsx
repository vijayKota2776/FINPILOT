
import React from 'react';
import { Clock, ShieldCheck, Eye, Key } from 'lucide-react';

export function ValueStrip() {
  const values = [
    { icon: <Clock className="w-6 h-6 text-blue-600" />, title: 'Save Time', desc: 'Automate repetitive finance work.' },
    { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: 'Reduce Errors', desc: 'AI-assisted reconciliation and review.' },
    { icon: <Eye className="w-6 h-6 text-blue-600" />, title: 'See Clearly', desc: 'Understand cash flow and performance.' },
    { icon: <Key className="w-6 h-6 text-blue-600" />, title: 'Stay in Control', desc: 'Human approval for important decisions.' },
  ];

  return (
    <section className="border-y bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((v, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">{v.icon}</div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">{v.title}</h3>
              <p className="text-sm text-slate-600">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}