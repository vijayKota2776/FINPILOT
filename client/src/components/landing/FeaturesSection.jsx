
import React from 'react';
import { ArrowRight, LayoutDashboard, FileText, PieChart, MessageSquare, Shield, CheckSquare } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    { icon: <LayoutDashboard className="w-6 h-6 text-blue-600" />, title: "Smart Transactions", desc: "Organize and understand financial transactions." },
    { icon: <CheckSquare className="w-6 h-6 text-blue-600" />, title: "AI Reconciliation", desc: "Identify matches, duplicates and exceptions." },
    { icon: <FileText className="w-6 h-6 text-blue-600" />, title: "Invoices & Bills", desc: "Track receivables and payables in one place." },
    { icon: <PieChart className="w-6 h-6 text-blue-600" />, title: "Financial Reports", desc: "Understand income, expenses, cash flow and performance." },
    { icon: <MessageSquare className="w-6 h-6 text-blue-600" />, title: "AI Finance Assistant", desc: "Ask questions and get answers from your financial data." },
    { icon: <Shield className="w-6 h-6 text-blue-600" />, title: "Approvals & Audit Trail", desc: "Keep humans in control of important financial actions." }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white border-t">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-950 mb-16">Everything your finance team needs to stay ahead.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer bg-slate-50 hover:bg-white">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 mb-6">{f.desc}</p>
              <div className="flex items-center text-blue-600 font-medium text-sm">
                Learn more <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}