
import React from 'react';

export function WorkflowSection() {
  const steps = [
    { title: "CONNECT", desc: "Connect your financial data, upload statements, or bring in accounting documents." },
    { title: "PROCESS", desc: "FinPilot organizes transactions, invoices and financial records automatically." },
    { title: "REVIEW", desc: "AI identifies matches, categories and exceptions for your team to review." },
    { title: "UNDERSTAND", desc: "See cash flow, expenses, receivables, payables and financial trends." },
    { title: "ACT", desc: "Turn financial information into clearer, faster business decisions." }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">From financial data to better decisions</h2>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between relative">
          <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-blue-100"></div>
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center max-w-[200px] mx-auto mb-10 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 font-bold mb-6 text-lg">
                {i + 1}
              </div>
              <h3 className="font-bold text-slate-900 mb-3 tracking-wide">{step.title}</h3>
              <p className="text-sm text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}