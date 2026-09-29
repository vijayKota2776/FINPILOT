import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function KYCVerification() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('PENDING'); // PENDING, VERIFIED

  const handleVerify = async () => {
    setLoading(true);
    const companyId = localStorage.getItem('onboarding_company_id');
    
    try {
      if (companyId && companyId !== 'mock_company_123') {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/companies/${companyId}/simulate-kyc`, {
          method: 'POST',
          credentials: 'include'
        });
      }
      
      // Simulate delay for realism
      setTimeout(() => {
        setStatus('VERIFIED');
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setStatus('VERIFIED');
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Company Verification</h2>
      <p className="text-slate-600 mb-8">Determine the authorized representative for this workspace.</p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Authorized Representative</h3>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="font-bold text-slate-900">{user?.name || 'Current User'}</div>
            <div className="text-sm text-slate-500">{user?.email || 'user@example.com'}</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
          <div>
            <div className="text-sm font-medium text-slate-700">Verification Status</div>
            <div className={`text-sm font-bold ${status === 'VERIFIED' ? 'text-green-600' : 'text-amber-500'}`}>
              {status}
            </div>
          </div>
          
          {status === 'VERIFIED' && (
            <div className="text-right">
              <div className="text-sm font-medium text-slate-700">Workspace Role</div>
              <div className="text-sm font-bold text-blue-600">MASTER_ADMIN</div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
        {status === 'PENDING' ? (
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            {loading ? 'Verifying Identity...' : 'Simulate KYC Verification'}
          </button>
        ) : (
          <button
            onClick={() => navigate('/onboarding/connections')}
            className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
