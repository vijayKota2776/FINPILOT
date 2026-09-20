import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeamSetup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('FINANCE_MEMBER');
  const [invites, setInvites] = useState([]);

  const handleInvite = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // In a real app, this would hit POST /api/companies/:id/invitations
    setInvites([...invites, { email, role, id: Date.now() }]);
    setEmail('');
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Invite your team</h2>
      <p className="text-slate-600 mb-8">Add members to your workspace. You can invite up to 3 more people on the starter plan.</p>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between mb-6">
        <div className="text-sm font-medium text-blue-800">Available Seats</div>
        <div className="text-sm font-bold text-blue-900">{1 + invites.length} / 4 used</div>
      </div>

      <form onSubmit={handleInvite} className="flex gap-4 mb-8">
        <input
          type="email"
          required
          placeholder="colleague@company.com"
          className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select 
          className="px-4 py-3 border border-slate-300 rounded-lg bg-white outline-none"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="FINANCE_ADMIN">Admin</option>
          <option value="FINANCE_MEMBER">Member</option>
        </select>
        <button 
          type="submit"
          disabled={invites.length >= 3}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg disabled:opacity-50"
        >
          Send Invite
        </button>
      </form>

      {invites.length > 0 && (
        <div className="space-y-3 mb-8">
          <h4 className="text-sm font-semibold text-slate-900">Pending Invitations</h4>
          {invites.map(invite => (
            <div key={invite.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white">
              <div>
                <div className="text-sm font-medium text-slate-900">{invite.email}</div>
                <div className="text-xs text-slate-500">{invite.role === 'FINANCE_ADMIN' ? 'Finance Admin' : 'Finance Member'}</div>
              </div>
              <div className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">Pending</div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-6 border-t border-slate-100 flex justify-end">
        <button
          onClick={() => navigate('/onboarding/complete')}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
