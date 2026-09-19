
import React from 'react';

export function AudienceSection() {
  const audiences = [
    { title: "FOUNDERS", desc: "Know where your money is going without waiting for reports." },
    { title: "ACCOUNTANTS", desc: "Spend less time on repetitive reconciliation and data entry." },
    { title: "CFOs / FINANCE HEADS", desc: "Get a clearer view of cash, working capital and financial performance." },
    { title: "BUSINESS OWNERS", desc: "Understand the numbers and make decisions faster." }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {audiences.map((a, i) => (
          <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold tracking-widest text-blue-600 mb-4">{a.title}</div>
            <p className="text-xl text-slate-800 font-medium">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}