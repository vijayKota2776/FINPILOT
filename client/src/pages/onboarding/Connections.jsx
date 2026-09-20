import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Connections() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    // Simulate secure bank connection OAuth flow
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2000);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Secure Connections</h2>
      <p className="text-slate-600 mb-8">Link your financial accounts to sync data automatically.</p>

      <div className="space-y-4 mb-8">
        {/* Bank Connection Card */}
        <div className="flex items-center justify-between p-5 border border-slate-200 rounded-xl bg-white hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center font-bold text-blue-900">
              🏦
            </div>
            <div>
              <h4 className="font-bold text-slate-900">HDFC Bank</h4>
              <p className="text-sm text-slate-500">
                {connected ? 'Connected • Last synced: Just now' : 'Connect corporate banking'}
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleConnect}
            disabled={connecting || connected}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              connected 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {connecting ? 'Connecting...' : connected ? 'Connected' : 'Connect'}
          </button>
        </div>

        {/* ERP Connection Card */}
        <div className="flex items-center justify-between p-5 border border-slate-200 rounded-xl bg-white opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center font-bold text-blue-900">
              📊
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Tally Prime / Zoho Books</h4>
              <p className="text-sm text-slate-500">Connect accounting software</p>
            </div>
          </div>
          <button disabled className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-400">
            Coming Soon
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-between">
        <button
          onClick={() => navigate('/onboarding/team')}
          className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium"
        >
          Skip for now
        </button>
        <button
          onClick={() => navigate('/onboarding/team')}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
