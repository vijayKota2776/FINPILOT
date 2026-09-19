
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

export function WaitlistModal({ isOpen, onClose }) {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('http://localhost:5001/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      // Even if API fails due to no DB connection, simulate success for demo purposes if preferred, 
      // but the prompt says use existing backend.
      setStatus('error'); 
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        {status === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🚀</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">You're on the list</h3>
            <p className="text-slate-600 mb-8">We'll let you know as soon as FinPilot is ready for you.</p>
            <Button className="w-full" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-950">Be among the first to use FinPilot</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Name</label>
                <input required name="name" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Work Email</label>
                <input required type="email" name="email" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Company</label>
                <input required name="company" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Role</label>
                  <select required name="role" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select...</option>
                    <option>Founder</option><option>Business Owner</option><option>CFO</option><option>Finance Head</option><option>Accountant</option><option>CA</option><option>Finance Executive</option><option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Size</label>
                  <select required name="companySize" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select...</option>
                    <option>1–10</option><option>11–50</option><option>51–100</option><option>101–250</option><option>250+</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">What do you want to automate most?</label>
                <select name="automationInterest" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="">Select...</option>
                  <option>Bank reconciliation</option><option>Invoice management</option><option>Bills / AP</option><option>Receivables / collections</option><option>Financial reporting</option><option>Cash-flow analysis</option><option>Other</option>
                </select>
              </div>

              {status === 'error' && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                  There was an error saving your request. Ensure backend is running.
                </div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white pt-2 mt-4" disabled={status === 'loading'}>
                {status === 'loading' ? 'Joining...' : 'Join Early Access'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}