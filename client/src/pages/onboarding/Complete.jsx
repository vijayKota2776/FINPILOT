import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceContext } from '../../context/WorkspaceContext';

export default function Complete() {
  const navigate = useNavigate();
  const { refreshWorkspaces } = useContext(WorkspaceContext);
  const [loading, setLoading] = useState(false);

  const handleGoToDashboard = async () => {
    setLoading(true);
    await refreshWorkspaces();
    navigate('/dashboard');
  };

  return (
    <div className="p-16 text-center">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-3xl font-extrabold text-slate-900 mb-4">You're ready to use FINPILOT.</h2>
      <p className="text-slate-600 mb-10 max-w-sm mx-auto">
        Your workspace is configured and ready to go. Financial data will begin syncing automatically.
      </p>

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 max-w-sm mx-auto mb-10 text-left space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-500">Verification</span>
          <span className="text-sm font-bold text-green-600">Verified</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-500">Workspace</span>
          <span className="text-sm font-bold text-slate-900">Ready</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-500">Team</span>
          <span className="text-sm font-bold text-slate-900">Configured</span>
        </div>
      </div>

      <button
        onClick={handleGoToDashboard}
        disabled={loading}
        className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {loading ? 'Entering Workspace...' : 'Go to Dashboard'}
      </button>
    </div>
  );
}
