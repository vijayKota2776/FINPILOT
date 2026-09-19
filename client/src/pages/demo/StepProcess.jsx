
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, ArrowRight, Sparkles } from 'lucide-react';

const rawTransactions = [
  { id: 1, raw: "UPI/AWS/MUMBAI/10293", amount: -4500, time: 500, category: "Software & IT" },
  { id: 2, raw: "NEFT/CLIENT ABC/INV-001", amount: 150000, time: 1500, category: "Revenue" },
  { id: 3, raw: "POS/UBER TRIP/BLR", amount: -850, time: 2500, category: "Travel" },
  { id: 4, raw: "ACH/ZOHO CORP/SUB", amount: -1200, time: 3500, category: "Software & IT" }
];

export default function StepProcess() {
  const navigate = useNavigate();
  const [processedTx, setProcessedTx] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    rawTransactions.forEach(tx => {
      setTimeout(() => {
        setProcessedTx(prev => [...prev, tx]);
      }, tx.time);
    });

    setTimeout(() => {
      setIsDone(true);
    }, 4500);
  }, []);

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col relative pb-24">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Step 2: Process</h1>
          <p className="text-slate-600 mt-1">FinPilot's AI engine instantly cleans and categorizes raw banking data.</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500">
          <div>Raw Bank Feed</div>
          <div>AI Output</div>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto">
          {processedTx.length === 0 && <div className="text-center text-slate-400 py-10 animate-pulse">Waiting for incoming data...</div>}
          
          {processedTx.map(tx => (
            <div key={tx.id} className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 animate-in slide-in-from-left-8 fade-in duration-500">
              <div className="font-mono text-sm text-slate-600 bg-slate-200/50 px-3 py-2 rounded-lg truncate">
                {tx.raw}
              </div>
              
              <div className="flex flex-col items-center justify-center text-blue-500">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <div className="w-8 h-px bg-blue-200 mt-2"></div>
              </div>
              
              <div className="flex justify-between items-center bg-white border border-blue-100 shadow-sm px-4 py-3 rounded-xl">
                 <div className="font-bold text-sm text-slate-800">{tx.category}</div>
                 <div className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>₹{Math.abs(tx.amount).toLocaleString('en-IN')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Bar */}
      {isDone && (
        <div className="absolute bottom-0 left-0 w-full p-6 animate-in slide-in-from-bottom-8 duration-500 flex justify-end pointer-events-none">
          <button onClick={() => navigate('/demo/review')} className="pointer-events-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
            Next Step: Review Matches <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}