
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function StepConnect() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col justify-center max-w-2xl mx-auto py-12">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Link2 className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Step 1: Connect</h1>
        <p className="text-lg text-slate-600 mt-3 max-w-lg mx-auto">FinPilot securely pulls data directly from your bank accounts in real-time, eliminating manual data entry.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 text-center max-w-md mx-auto w-full relative">
        {!connected ? (
          <>
            <div className="flex justify-center mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg" alt="HDFC" className="h-8 opacity-80" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-2">Connect HDFC Current Account</h3>
            <p className="text-sm text-slate-500 mb-8">Secure connection via Open Banking API.</p>
            
            <button 
              onClick={handleConnect}
              disabled={connecting}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-80"
            >
              {connecting ? <><Loader2 className="w-5 h-5 animate-spin" /> Connecting...</> : 'Connect Account'}
            </button>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-green-500" /> Bank-grade encryption
            </div>
          </>
        ) : (
          <div className="animate-in zoom-in-95 duration-500 py-4">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle2 className="w-10 h-10 text-green-600" />
             </div>
             <h3 className="font-bold text-slate-900 text-xl mb-2">Successfully Connected!</h3>
             <p className="text-sm text-slate-500 mb-8">HDFC Bank data is now flowing into FinPilot.</p>
             <button onClick={() => navigate('/demo/process')} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
               Next Step: Process Data <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        )}
      </div>
    </div>
  );
}