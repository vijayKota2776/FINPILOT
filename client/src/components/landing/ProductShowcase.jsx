
import React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export function ProductShowcase() {
  const navigate = useNavigate();
  return (
    <section id="product" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-950 mb-20">Finance work, without the finance chaos.</h2>
        
        <div className="space-y-24">
          {/* Block 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 lg:pr-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">AI-Powered Reconciliation</h3>
              <p className="text-lg text-slate-600 mb-8">
                FinPilot helps your team identify matches, duplicates and exceptions without manually checking every transaction.
              </p>
              <Button onClick={() => navigate('/demo')} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">See Reconciliation</Button>
            </div>
            <div className="flex-1 w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
               <div className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide border-b pb-2">Bank Transaction</div>
               <div className="flex justify-between items-center mb-6">
                 <div className="font-medium">ABC Suppliers</div>
                 <div className="font-bold text-slate-800">₹4,21,000</div>
               </div>
               <div className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide border-b pb-2">Possible Ledger Match</div>
               <div className="flex justify-between items-center mb-6">
                 <div className="font-medium">ABC Suppliers</div>
                 <div className="font-bold text-slate-800">₹4,12,000</div>
               </div>
               <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl mb-6">
                 <div className="flex justify-between items-center mb-2">
                   <div className="text-yellow-800 font-semibold text-sm">Potential match found</div>
                   <div className="text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full font-bold">78% Confidence</div>
                 </div>
                 <p className="text-sm text-yellow-700">The ledger amount differs by ₹9,000.</p>
               </div>
               <div className="flex gap-3">
                 <Button className="flex-1 bg-blue-600">Review</Button>
                 <Button className="flex-1" variant="outline">Investigate</Button>
               </div>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1 lg:pl-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Finance Assistant</h3>
              <p className="text-lg text-slate-600 mb-8">
                Ask questions about your business and get answers grounded in your financial data.
              </p>
              <Button onClick={() => navigate('/demo')} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">Try the AI Demo</Button>
            </div>
            <div className="flex-1 w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
               <div className="flex flex-col gap-4">
                 <div className="self-end bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
                   Show my top 5 expenses this month.
                 </div>
                 <div className="self-start bg-slate-100 text-slate-800 p-4 rounded-2xl rounded-tl-none text-sm max-w-[90%]">
                   <p className="mb-3">Here are your top 5 expenses:</p>
                   <ol className="list-decimal pl-4 space-y-1 font-medium">
                     <li>Raw Materials — ₹2,45,000</li>
                     <li>Salaries — ₹1,80,000</li>
                     <li>Rent — ₹75,000</li>
                     <li>Marketing — ₹42,000</li>
                     <li>Utilities — ₹28,000</li>
                   </ol>
                   <p className="mt-3 text-xs text-slate-400 italic">Based on demo workspace data.</p>
                 </div>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}