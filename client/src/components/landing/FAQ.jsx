
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const faqs = [
    { q: "What exactly does FINPILOT do?", a: "FINPILOT is an intelligent financial workspace that brings together bank data, accounting records, and invoices to automate reconciliation and provide real-time business insights." },
    { q: "Does FINPILOT connect to my bank?", a: "The current public demo uses simulated data. Real integrations will be introduced progressively in the production version." },
    { q: "Who is FINPILOT built for?", a: "It's built for founders, CFOs, and finance teams at Indian SMBs who want to move away from fragmented spreadsheets." },
    { q: "Is FINPILOT currently available?", a: "We are currently in early access. You can join the waitlist to be notified when we open to new businesses." }
  ];

  const [open, setOpen] = useState(0);

  return (
    <section className="py-32 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none" 
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span className="font-semibold text-slate-900">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${open === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}