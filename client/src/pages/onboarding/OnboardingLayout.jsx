import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const steps = [
  { id: 'company', title: '1. Company', path: '/onboarding/company' },
  { id: 'verification', title: '2. Verification', path: '/onboarding/verification' },
  { id: 'connections', title: '3. Connections', path: '/onboarding/connections' },
  { id: 'team', title: '4. Team', path: '/onboarding/team' },
  { id: 'complete', title: '5. Complete', path: '/onboarding/complete' },
];

export default function OnboardingLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-slate-950 text-white p-10 flex flex-col hidden md:flex">
        <div className="text-xl font-bold tracking-tight flex items-center gap-2 mb-16">
          <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-black shadow-inner">F</div>
          FINPILOT
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const isActive = location.pathname.includes(step.path);
            const isPast = steps.findIndex(s => location.pathname.includes(s.path)) > index;

            return (
              <div key={step.id} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                  ${isActive ? 'bg-blue-600 text-white' : isPast ? 'bg-slate-800 text-slate-300' : 'bg-slate-800/50 text-slate-500'}`}>
                  {isPast ? '✓' : index + 1}
                </div>
                <div className={`font-medium ${isActive ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.title.split('. ')[1]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
